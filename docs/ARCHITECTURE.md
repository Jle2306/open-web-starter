# Architecture

## Runtime and data flow

Next.js App Router exports static HTML and browser JavaScript to out/. Layout
and catalogue server components run at build time. Interactive starter pages
are client components. No API routes, server actions or backend process ship here.

Booking page → typed config → BookingForm → validation → submission callback.
The default callback returns an explicit demo result or inserts a pending request
through Supabase REST. It never converts network failure into mock success.
Errors preserve input; a ref and disabled controls guard duplicate submissions.

## Boundaries and reuse

- src/components/ui: generic Button/Card extracted from the original project.
- src/components/booking/BookingForm.tsx: accepts BookingConfig and BookingSubmit.
- src/lib/booking.ts: domain types, pure validation and payload mapping.
- src/data/booking.ts: synthetic service and slot configuration.
- src/lib/supabase.ts: optional insert adapter using public configuration only.
- src/components/ExampleNotice.tsx: consistent demonstration boundaries.

Copy BookingForm, lib/booking.ts, UI components and lib/utils.ts into another
Next.js app. Keep Tailwind configured, adapt the @/* alias and pass your own
config and async submission callback. Copying the full portfolio is unnecessary.

Client validation is UX only. Production requires backend authorization and
availability checks. RLS/grants protect public client keys; a key itself does not.
See [Security](../SECURITY.md) and [SQL example](supabase.sql).

## Provenance

Maintainer-owned source: [Jle2306/Jle2306.github.io](https://github.com/Jle2306/Jle2306.github.io).
The local portfolio snapshot was inspected and built before extraction; remote
history was separately inspected. No old commits, .env.local, analytics, private
images, customer records, testimonials or invented business metrics are imported.

| New module | Source pattern |
| --- | --- |
| Button, Card, class utility | src/components/ui and src/lib/utils.ts |
| BookingForm and config | src/app/demos/beauty-booking/book/BeautyBookingBookClient.tsx and beauty-booking/data.ts |
| Supabase adapter | src/lib/supabase.ts, narrowed to typed booking records |

This is extraction/refactoring into independent history, not a portfolio rename.
