# Security policy

## Supported versions

The latest 0.1.x release receives fixes on main on a best-effort basis. Older versions are
unsupported. This independent example project has no response SLA.

## Reporting a vulnerability

Do not publish high-risk vulnerabilities or exploit details in public issues.
Please contact the maintainer privately through the contact information
available on the maintainer's [GitHub profile](https://github.com/Jle2306).
If no private contact is listed, request a reporting channel without sensitive
details. GitHub private vulnerability reporting is suitable where enabled.

Include affected version, impact, reproduction and proposed mitigation.
Never attach credentials or real customer records. Coordinate disclosure
after a fix or mitigation is available.

## Credentials and Supabase

- Never commit credentials, API keys, passwords, tokens, .env or .env.local.
- .env.example contains empty public configuration fields only.
- Supabase anon/publishable keys are public client identifiers, not access controls.
- Never expose a service role key through NEXT_PUBLIC_* or browser code.
- Enable Row Level Security on every exposed table; restrict row ownership
  and operations. Test anonymous and authenticated access separately.
- Do not grant public SELECT on customer records. Demo dashboards are not
  authenticated administration systems.
- Add server validation, authorization, rate limiting, atomic booking
  availability and server-authoritative pricing before using real data.

## Known dependency advisory

As of 2026-10-22, the development-only Next ESLint dependency chain includes
braces affected by [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
Upstream reports no patched version. Malicious nested glob patterns can
exhaust the stack. Keep CI unprivileged; do not lint untrusted projects with
secrets or production access. Track an upstream fix. Static exported pages
do not ship this lint dependency. This is an acknowledged finding, not a
clean full audit. Run npm audit to inspect current dependency status.
