import type { BookingRecord, SubmissionResult } from "@/lib/booking";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Only public anon/publishable credentials belong in a browser bundle. */
export function persistenceMode(): "demo" | "supabase" | "incomplete" {
  if (!url && !anonKey) return "demo";
  return url && anonKey ? "supabase" : "incomplete";
}

export async function submitBooking(record: BookingRecord): Promise<SubmissionResult> {
  const mode = persistenceMode();
  if (mode === "demo") return { mode, message: "Demo complete. Nothing was sent or saved, and no appointment was reserved." };
  if (mode === "incomplete") throw new Error("Set both public Supabase environment variables, or leave both empty for demo mode.");
  const endpoint = new URL(url!);
  if (endpoint.protocol !== "https:" && !(endpoint.protocol === "http:" && ["localhost", "127.0.0.1"].includes(endpoint.hostname))) {
    throw new Error("Use an HTTPS Supabase URL, or localhost for a local instance.");
  }
  endpoint.pathname = `${endpoint.pathname.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "")}/rest/v1/bookings`;
  endpoint.search = "";
  endpoint.hash = "";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { apikey: anonKey!, Authorization: `Bearer ${anonKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify(record),
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error(`Booking was not saved (HTTP ${response.status}). Check the schema and RLS policy.`);
  return { mode: "supabase", message: "Request saved to Supabase as pending. Availability is not confirmed; no appointment is reserved yet." };
}
