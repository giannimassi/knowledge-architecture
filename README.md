# Knowledge Architecture

Public website for the thesis: **Your agent doesn't need memory. It needs a knowledge architecture.**

Live: https://knowledge-architecture.vercel.app

Repo: https://github.com/giannimassi/knowledge-architecture

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```

The project uses static export (`out/`) so it can deploy to Vercel or Cloudflare Pages.

## Deploy

### Vercel

Current live deployment was published from the static `out/` directory and aliased to `knowledge-architecture.vercel.app`.

If importing the repo in Vercel, use:

- Build command: `npm run build`
- Output directory: `out`

If Vercel auto-detects the project as Next.js and expects `.next`, set it as a static output project or deploy the `out/` directory.

### Cloudflare Pages

Import the repo in Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `out`

`wrangler.toml` is included for Pages deployments.
