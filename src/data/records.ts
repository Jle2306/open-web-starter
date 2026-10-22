import type { DemoRecord } from "@/components/admin/RecordManager";

// Fictional examples. Counts are computed from these records, not project metrics.
export const leadStatuses = ["New", "Contacted", "Won"] as const;
export const leads: DemoRecord[] = [
  { id: "lead-1", name: "Example Studio", detail: "Example Person · studio@example.com · interested in a booking page", source: "Website", status: "New", note: "Synthetic lead: ask which services need booking." },
  { id: "lead-2", name: "Sample Workshop", detail: "Sample Person · workshop@example.com · workshop landing page", source: "Referral", status: "Contacted", note: "Synthetic lead: discuss page structure." },
  { id: "lead-3", name: "Demo Shop", detail: "Demo Person · shop@example.com · product order form", source: "Website", status: "Won", note: "Synthetic lead: prepare sample catalogue." },
];
export const requestStatuses = ["Pending", "Confirmed", "Cancelled"] as const;
export const requests: DemoRecord[] = [
  { id: "request-1", name: "Example Request A", detail: "Introductory consultation · fixture only", source: "Booking", status: "Pending", note: "Not connected to the booking form or Supabase." },
  { id: "request-2", name: "Example Request B", detail: "Standard session · fixture only", source: "Booking", status: "Confirmed", note: "A synthetic status, not a real reservation." },
  { id: "request-3", name: "Example Request C", detail: "Product inquiry · fixture only", source: "Order", status: "Cancelled", note: "No customer records are loaded." },
];
