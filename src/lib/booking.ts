export type BookingService = { id: string; name: string; durationMinutes: number; priceLabel: string };
export type BookingConfig = {
  businessName: string;
  services: readonly BookingService[];
  slots: readonly string[];
  unavailableSlots: readonly string[];
};
export type BookingInput = { serviceId: string; date: string; time: string; name: string; email: string; note: string };
export type BookingRecord = {
  service_id: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  email: string;
  note: string;
  status: "pending";
};
export type SubmissionResult = { mode: "demo" | "supabase"; message: string };
export type BookingSubmit = (booking: BookingRecord) => Promise<SubmissionResult>;

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Client-side UX validation. A production server must repeat all validation. */
export function validateBooking(input: BookingInput, config: BookingConfig, now = new Date()): string | null {
  if (!config.services.some((service) => service.id === input.serviceId)) return "Choose a valid service.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) return "Choose a valid date.";
  const selectedDate = new Date(`${input.date}T12:00:00`);
  if (Number.isNaN(selectedDate.getTime()) || localDate(selectedDate) !== input.date) return "Choose a valid date.";
  const lastDate = new Date(now); lastDate.setDate(lastDate.getDate() + 90);
  if (input.date < localDate(now) || input.date > localDate(lastDate)) return "Choose a date within the next 90 days.";
  if (!config.slots.includes(input.time) || config.unavailableSlots.includes(input.time)) return "Choose an available time.";
  if (new Date(`${input.date}T${input.time}:00`).getTime() <= now.getTime()) return "Choose a future appointment time.";
  if (!input.name.trim() || input.name.trim().length > 100) return "Enter a name between 1 and 100 characters.";
  if (input.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) return "Enter a valid email address.";
  if (input.note.length > 1000) return "Keep notes under 1,001 characters.";
  return null;
}

export function bookingRecord(input: BookingInput): BookingRecord {
  return { service_id: input.serviceId, booking_date: input.date, booking_time: input.time,
    customer_name: input.name.trim(), email: input.email.trim(), note: input.note.trim(), status: "pending" };
}
