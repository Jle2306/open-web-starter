"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { bookingRecord, validateBooking, type BookingConfig, type BookingInput, type BookingSubmit } from "@/lib/booking";

const empty: BookingInput = { serviceId: "", date: "", time: "", name: "", email: "", note: "" };

/** Adapted from the portfolio's service/date/slot selection and booking summary. */
export function BookingForm({ config, onSubmit }: { config: BookingConfig; onSubmit: BookingSubmit }) {
  const [input, setInput] = useState(empty);
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const submitting = useRef(false);
  const feedback = useRef<HTMLParagraphElement>(null);
  const service = config.services.find((item) => item.id === input.serviceId);

  function update(field: keyof BookingInput, value: string) {
    setInput((current) => ({ ...current, [field]: value }));
    setMessage("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const error = validateBooking(input, config);
    if (error) { setMessage(error); feedback.current?.focus(); return; }
    submitting.current = true;
    setPending(true);
    setMessage("");
    try {
      const result = await onSubmit(bookingRecord(input));
      setMessage(result.message);
      setInput(empty);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit. Your entries have been kept so you can retry.");
    } finally {
      submitting.current = false;
      setPending(false);
      feedback.current?.focus();
    }
  }

  return <div className="grid items-start gap-6 lg:grid-cols-[1fr_1.5fr]">
    <Card><h2 className="text-2xl font-semibold">Request summary</h2>
      <dl className="mt-6 space-y-4 text-sm">
        <div><dt className="text-slate-500">Service</dt><dd>{service?.name ?? "Not selected"}</dd></div>
        <div><dt className="text-slate-500">Date / time</dt><dd>{input.date || "Not selected"} {input.time}</dd></div>
        <div><dt className="text-slate-500">Duration / example price</dt><dd>{service ? `${service.durationMinutes} minutes · ${service.priceLabel}` : "Select a service"}</dd></div>
      </dl><p className="mt-6 text-sm leading-6 text-slate-600">Times use your browser’s local timezone. Disabled slots are sample fixtures, not live availability. Requests require business confirmation.</p>
    </Card>
    <Card><form onSubmit={submit} noValidate aria-label="Booking request">
      <fieldset disabled={pending} className="grid gap-6">
        <legend className="mb-6 text-2xl font-semibold">Request an appointment</legend>
        <fieldset><legend className="mb-3 text-sm font-semibold">Service</legend><div className="grid gap-3 sm:grid-cols-2">
          {config.services.map((item) => <label key={item.id} className={`rounded-xl border p-4 ${input.serviceId === item.id ? "border-cyan-600 bg-cyan-50" : "border-slate-200"}`}>
            <span className="flex items-center gap-2"><input className="!min-h-4 !w-4" type="radio" name="service" value={item.id} checked={input.serviceId === item.id} onChange={() => update("serviceId", item.id)} />{item.name}</span>
            <span className="font-normal text-slate-600">{item.durationMinutes} minutes · {item.priceLabel}</span>
          </label>)}
        </div></fieldset>
        <label>Date (within 90 days)<input type="date" required value={input.date} onChange={(event) => update("date", event.target.value)} /></label>
        <fieldset><legend className="mb-3 text-sm font-semibold">Time</legend><div className="flex flex-wrap gap-2">
          {config.slots.map((slot) => <button key={slot} type="button" aria-pressed={input.time === slot} disabled={config.unavailableSlots.includes(slot)} onClick={() => update("time", slot)} className={`min-h-11 rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${input.time === slot ? "border-cyan-700 bg-cyan-50" : "border-slate-300"}`}>{slot}{config.unavailableSlots.includes(slot) ? " · unavailable" : ""}</button>)}
        </div></fieldset>
        <label>Name<input autoComplete="name" required maxLength={100} value={input.name} onChange={(event) => update("name", event.target.value)} /></label>
        <label>Email<input type="email" autoComplete="email" required maxLength={254} value={input.email} onChange={(event) => update("email", event.target.value)} /></label>
        <label>Notes (optional)<textarea maxLength={1000} rows={3} value={input.note} onChange={(event) => update("note", event.target.value)} /></label>
        <Button type="submit" disabled={pending}>{pending ? "Submitting…" : "Submit request"}</Button>
      </fieldset>
      <p ref={feedback} tabIndex={-1} role="status" aria-live="polite" className={message ? "mt-5 rounded-lg bg-slate-100 p-4 text-sm" : "sr-only"}>{message}</p>
    </form></Card>
  </div>;
}
