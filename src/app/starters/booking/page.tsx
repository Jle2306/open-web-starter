"use client";
import { BookingForm } from "@/components/booking/BookingForm";
import { ExampleNotice } from "@/components/ExampleNotice";
import { bookingConfig } from "@/data/booking";
import { persistenceMode, submitBooking } from "@/lib/supabase";

export default function BookingPage() {
  const mode = persistenceMode();
  return <><ExampleNotice>{mode === "demo" ? "This form validates locally and never sends or stores your information." : mode === "supabase" ? "This form submits to your configured Supabase project. Requests are pending, not confirmed appointments." : "Supabase configuration is incomplete; submissions will fail until both public values are provided."}</ExampleNotice>
    <p className="text-sm font-semibold text-cyan-800">{bookingConfig.businessName}</p><h1 className="mt-3 text-4xl font-bold">Booking Starter</h1><p className="mb-8 mt-4 text-slate-600">A configurable service, date and time selection workflow.</p>
    <BookingForm config={bookingConfig} onSubmit={submitBooking} />
  </>;
}
