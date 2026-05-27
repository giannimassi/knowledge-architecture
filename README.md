# Knowledge Architecture

Public website for the thesis: **Your agent doesn't need memory. It needs a knowledge architecture.**

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The project uses static export (`out/`) so it can deploy to Vercel or Cloudflare Pages.

## Deploy

### Vercel

Import `giannimassi/knowledge-architecture` in Vercel. Build command: `npm run build`; output directory: `out`.

### Cloudflare Pages

Import the repo in Cloudflare Pages. Build command: `npm run build`; output directory: `out`.
