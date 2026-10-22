# Contributing

Read the [Code of Conduct](CODE_OF_CONDUCT.md) and existing issues first.
Discuss larger changes in an issue before implementation. Reproducible bug
reports and documentation fixes are useful contributions too.

## Fork and install

Fork using GitHub's Fork button, then:

```sh
git clone https://github.com/YOUR_USERNAME/open-web-starter.git
cd open-web-starter
git remote add upstream https://github.com/Jle2306/open-web-starter.git
npm ci
npm run dev
```

Use Node.js 24, recorded in .nvmrc. Open http://localhost:3000.
Environment values are optional for demos. Never copy production credentials
or customer data into contributions.

## Branch and commit

```sh
git switch -c feature/describe-your-change
```

Use feature/*, fix/*, docs/*, refactor/*, test/* or chore/* branches.
Write focused commits such as `fix: reject unavailable booking slots`.
Do not fabricate authorship, dates, reviews, metrics or feedback. Review
AI-assisted changes and explain material assistance in your PR.

## Check and submit a PR

```sh
npm run lint
npm run typecheck
npm run build
git push -u origin feature/describe-your-change
```

Open a PR from your fork to upstream main. Explain what changed, why, and
exactly what you tested. Link the actual issue using `Closes #123` only if
fully resolved. Include desktop and mobile screenshots for UI changes and
describe keyboard navigation and error states. Keep demo fixtures synthetic.
Update relevant docs and preserve explicit persistence/authentication limits.

The maintainer reviews the diff and passing CI before merging. Self-review
must be described as self-review, never as independent contributor review.
Report security issues privately using [SECURITY.md](SECURITY.md).
