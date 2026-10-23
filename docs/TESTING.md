# Testing

## Unit and adapter regression tests

`npm test` uses Node.js 24's built-in test runner. It covers booking date/slot
validation, payload normalization, empty and partial environment configuration,
insecure remote URLs, failed inserts and successful pending inserts. Adapter
tests replace fetch in-process and never contact a real database.

## Browser workflows

```sh
npm ci
npx playwright install chromium
npm run test:e2e
npm run test:e2e:connected
```

Each suite builds the actual static export, then serves it on 127.0.0.1:3101
using a loopback-only preview server managed by Playwright. Keep that
port free. Desktop Chrome and Pixel 7 emulation both use Chromium; this is not
cross-browser Safari/Firefox coverage. Tests use fresh browser contexts and
synthetic data. Retries are disabled so failures are visible.

- Demo suite: required fields, unavailable slots, invalid email, no-network
  submission, CRM filtering/edit/reset, order totals and reset, all page routes,
  JavaScript page errors and horizontal overflow.
- Connected suite: an export rebuilt with dummy public Supabase configuration;
  browser requests are intercepted to return 403 then 201 or a transport error.
  Values must survive failures, and failures cannot become mock successes.
- HTML reports and screenshots for all routes are saved in playwright-report/.
  CI uploads them as browser-test-results with 14-day retention.

These tests verify frontend behavior and the adapter contract, not live Supabase
RLS, production authentication, delivery, payments or booking concurrency.
Live database policy tests and automated accessibility audits remain roadmap work.

## Full validation

Run lint, typecheck, unit tests and build before the browser suites. CI performs
the same checks from npm ci. CodeQL is a separate required review input; npm audit
tracks dependency advisories and may report the known development-only upstream
finding described in SECURITY.md. Do not disable checks or suppress failures to
make the project look ready.
