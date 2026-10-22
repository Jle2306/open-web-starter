import type { BookingConfig } from "@/lib/booking";

// Synthetic fixtures. Replace this object when reusing the form.
export const bookingConfig: BookingConfig = {
  businessName: "Example Service Studio",
  services: [
    { id: "consultation", name: "Introductory consultation", durationMinutes: 30, priceLabel: "$25 example price" },
    { id: "session", name: "Standard session", durationMinutes: 60, priceLabel: "$50 example price" },
    { id: "extended", name: "Extended session", durationMinutes: 90, priceLabel: "$75 example price" },
  ],
  slots: ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"],
  unavailableSlots: ["12:00", "15:00"],
};
