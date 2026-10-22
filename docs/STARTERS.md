# Starters

## Booking Starter

Route: `/starters/booking/`.

Extracted and refactored from the maintainer portfolio's
`src/app/demos/beauty-booking/book/BeautyBookingBookClient.tsx` and `data.ts`.
Retains the service/date/time selection, summary and submission flow. Replaces
portfolio branding, relative dates, regional phone rules and business-specific
fields with typed configuration, calendar dates and generic contact information.

- Change `src/data/booking.ts` to configure services and sample times.
- Reuse `BookingForm` with a `BookingConfig` and an async `BookingSubmit` callback.
- `src/lib/booking.ts` contains pure validation and record mapping.
- The supplied adapter in `src/lib/supabase.ts` uses the `bookings` table.
- With both public environment values empty, submissions validate locally and
  report that nothing was sent or saved. Partial configuration is an error.
- Dates use browser-local time and must be within 90 days. Disabled slots are
  synthetic and repeat for every date; this is not a live availability service.
- Client validation is UX only. A production backend must repeat validation,
  authorize operations and reserve availability atomically.
- No authentication, payments, email delivery or staff management is included.

## Lightweight CRM and Admin Dashboard

Routes: /starters/crm/ and /starters/admin/. Both use RecordManager with typed synthetic records. Search, source/status filters, status editing, notes and reset work in React memory only. Summary counts derive from those records. No authentication, persistence or cross-page booking synchronization is implemented.

Adapt src/data/records.ts and pass initialRecords, statuses and title to RecordManager. Source patterns: src/app/demos/simple-crm/page.tsx and src/app/demos/beauty-booking/admin/page.tsx in the original portfolio. Original business records and hard-coded totals were replaced.

## Other planned starters

Personal Brand, Course Landing and Order Collection extraction are tracked in the roadmap; they are not yet implemented
in this commit.
