# Deployment

## Static export

```sh
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

Publish out/ on a static host supporting directory indexes. trailingSlash: true
creates route folders with index.html. No Node server is needed after export.
next start does not support this export configuration.

For local preview with Python installed:
`python -m http.server 3001 --directory out`.
Test direct navigation to /starters/booking/ as well as homepage navigation.

## Build hosts

Import the repository, select Node.js 24/npm, run npm run build and serve out/.
Leave both Supabase values unset for a public demo. Public environment changes
require rebuilding. Never deploy .env.local, logs, node_modules or Git history.

## GitHub Pages

Do not deploy over the maintainer's portfolio. For a separate Pages project
under /open-web-starter/, configure Next.js basePath to /open-web-starter before
building and prefix raw public URLs such as the metadata icon. Test every
direct route under that prefix, then publish out/ with a Pages workflow.
The default configuration targets a domain root, not a Pages project subpath.
A custom domain at / needs no basePath.

## Data-connected deployment

Follow [Supabase setup](GETTING_STARTED.md#optional-supabase-setup). Previews
should use a separate disposable database. Review RLS/grants before making
forms public. Add real authentication, rate limits, trusted pricing and atomic
slot reservation before accepting customer data. Demo admin pages are not
authenticated administration systems.

## Release gate

Verify the exact main commit's CI/CodeQL, inspect alerts, run a clean install
and checks, and validate documentation links. Only then record the actual date
in CHANGELOG, tag the verified commit and publish factual notes. A package
version by itself is not a release.
