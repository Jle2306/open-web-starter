# Getting started

## Requirements and first run

Install Node.js 24 and its bundled npm. The version is recorded in .nvmrc,
package.json and CI.

```sh
git clone https://github.com/Jle2306/open-web-starter.git
cd open-web-starter
npm ci
npm run dev
```

Open http://localhost:3000 and choose View Starters. Use
`npm run dev -- --port 3001` if the portfolio already occupies port 3000.
Demo mode needs no external account, database or paid API.

## Try booking

1. Open /starters/booking/ and submit an empty form to see validation.
2. Choose a service, a future date within 90 days and an enabled time.
3. Enter synthetic values such as Example Person and example@example.com.
4. Submit. Demo mode explicitly reports that nothing was sent or saved.

Disabled times repeat each date and are fixtures, not live availability.
Dates use browser-local time. Prices are examples.

## Checks

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

Node tests cover invalid dates, past times, unknown services, unavailable slots,
invalid contacts and payload normalization. They are not browser E2E tests;
browser testing is tracked separately in issue #9.

## Optional Supabase setup

Use a disposable project and synthetic data only.

1. Run [supabase.sql](supabase.sql) once in a new Supabase project's SQL editor.
2. Copy .env.example to .env.local. PowerShell: `Copy-Item .env.example .env.local`;
   POSIX shell: `cp .env.example .env.local`.
3. Set the project URL and public anon client key. Never use a service role key.
4. Restart dev or rebuild the deployment; NEXT_PUBLIC_* values are embedded at build time.
5. Submit synthetic data. Inspect the pending row through the Supabase dashboard.
6. Verify the anon key cannot SELECT, UPDATE or DELETE rows; test invalid service,
   status and length values are rejected. Do not disable RLS to make a test pass.

Keep SQL service IDs and times in sync with src/data/booking.ts. No live Supabase
credentials were used for extraction; remote RLS verification remains an open
roadmap item. The example enables insert-only anonymous requests, not reserved slots.

Before production add staff/tenant authentication, server-side validation,
rate limiting, timezone logic, retention/consent rules and atomic availability.
Public inserts can be abused even with RLS constraints.

## Troubleshooting

- Install: check Node 24 and run npm ci from this repository root.
- Empty environment: expected local demo behavior.
- Partial environment: set both public values or clear both.
- HTTP 401/403: inspect credentials, grants and RLS; do not turn off RLS.
- HTTP 400/404: check the table and payload against the SQL example.
- Network/timeout: input values are retained so you can retry.
- next start: unsupported in export mode; serve out/ instead.
- Build type declarations: npm run build regenerates Next.js route declarations.
