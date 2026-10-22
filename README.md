# Open Web Starter

Reusable open-source Next.js starters for personal brands,
local businesses, independent developers, students and small teams.

Open Web Starter provides practical reference implementations for common web
workflows such as landing pages, booking systems, order collection, lightweight
CRM and admin dashboards. Each example clearly states its persistence limits.

**Next.js + TypeScript + React + Tailwind CSS · MIT License · Node.js 24**

```sh
git clone https://github.com/Jle2306/open-web-starter.git
cd open-web-starter
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). No account or environment file is
needed for the demo. [Getting started](docs/GETTING_STARTED.md) · [MIT License](LICENSE).

## Why this project exists

Small applications often need the same service selection, lead management,
form submission and administration patterns. This project extracts those
patterns from the maintainer's existing portfolio into typed, readable examples
that can be adapted without inheriting portfolio-specific branding. Clear
boundaries and realistic reuse matter more than feature count.

## Included starters

| Starter | State | Scope |
| --- | --- | --- |
| Booking | Runnable example | Configurable service/date/time flow, validation and optional Supabase submission |
| Personal Brand | Presentation example | Creator and developer portfolio layout |
| Course Landing | Presentation example | Course/community/digital product landing page |
| Order Collection | Local demo | Cart and customer information collection |
| Lightweight CRM | In-memory example | Search, status filters and lead updates |
| Admin Dashboard | UI example | Summary cards, record filters and status actions |

See [Starter guide](docs/STARTERS.md). These are examples, not complete
production systems. Authentication, payments, notifications and atomic slot
reservations are not implemented. All supplied business records are synthetic.

## Live Demo

[Maintainer website](https://jle2306.github.io/)

The maintainer website contains live examples and related project demos.
It is a separate portfolio, not a production deployment of this repository.
Run the repository's current examples locally using the instructions above.

## Tech stack

- Next.js App Router with static export
- TypeScript, React and Tailwind CSS
- Optional Supabase REST insertion; no unused client SDK
- GitHub Actions CI, CodeQL and Dependabot
- Node.js built-in test runner

## Getting started

Use Node.js 24 and npm. Run npm ci, then npm run dev. If port 3000 is occupied,
use `npm run dev -- --port 3001`.

```sh
npm test
npm run lint
npm run typecheck
npm run build
```

The build produces out/. Read [Deployment](docs/DEPLOYMENT.md).
There is no next start server in export mode.

## Environment variables

Optionally copy .env.example to .env.local and configure both fields:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Both empty means explicit demo mode with no network request or persistence.
Only one populated is an error. Network failures never become mock successes.
Read [Supabase setup](docs/GETTING_STARTED.md#optional-supabase-setup).
Never expose service role keys. Public values are bundled at build time.

## Project structure

```text
.github/          CI, CodeQL, issue/PR templates, Dependabot
docs/             Onboarding, architecture, deployment, starter guide, SQL
public/           Project icon
src/app/          Pages and layouts
src/components/   Reusable UI and booking form
src/data/         Synthetic starter configuration
src/lib/          Validation and persistence adapter
tests/            Booking validation regressions
```

See [Architecture](docs/ARCHITECTURE.md) for reuse boundaries and provenance.

## Roadmap

[ROADMAP.md](ROADMAP.md) tracks extraction, data access, testing and community
work. Unfinished items stay unchecked. [CHANGELOG.md](CHANGELOG.md) records
implemented changes; Unreleased entries are not published releases.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md), open an issue and submit a focused PR.
Run all checks and include screenshots for UI changes. Contributions follow
the [Contributor Covenant](CODE_OF_CONDUCT.md).

## Security

Read [SECURITY.md](SECURITY.md) before connecting a database. Report sensitive
issues privately. A development-only upstream braces advisory is tracked in
[issue #11](https://github.com/Jle2306/open-web-starter/issues/11); the full
dependency audit is not clean. CodeQL/build success is not a security certification.

## License

[MIT](LICENSE) — Copyright (c) 2026 Jle2306.

## Maintainer

[Jle2306](https://github.com/Jle2306). Extracted from
[Jle2306.github.io](https://github.com/Jle2306/Jle2306.github.io), which remains
the maintainer's live demo and portfolio. No adoption metrics are claimed.
