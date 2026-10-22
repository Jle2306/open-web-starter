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

## Personal Brand and Course Landing

Routes: /starters/personal-brand/ and /starters/course-landing/. Reusable CreatorProfile and CourseLanding components accept typed content from src/data/landing.ts. Edit content and links there; keep examples marked fictional until replaced with your own truthful information. These are presentation templates, not enrollment or contact backends. Source patterns: the original personal-brand/page.tsx and course-landing/page.tsx. Promotional metrics and testimonials were removed.

## Order Collection

Route: /starters/order-collection/. OrderForm accepts products and an async onSubmit callback. Configure sample products in src/data/products.ts. Quantities are integer values from 0 to 99; totals are calculated in minor currency units. The callback receives product IDs and quantities, not trusted prices. The included page is a local demo and never sends, saves or charges anything.

Extracted cart/contact collection patterns from the original private-order/order/PrivateOrderPageClient.tsx. Real commerce needs backend price/inventory validation, secure persistence, authorization and payment processing. Supabase integration is provided only for booking, not orders, CRM or admin.
