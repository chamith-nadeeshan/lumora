# Lumora

Marketing site for Lumora — table lamps for a softer way of living. Built with Next.js (App Router) and exported as a fully static site.

**Live:** https://chamith-nadeeshan.github.io/lumora/

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build (static export)

```bash
npm run build      # outputs ./out
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static
export with `PAGES_BASE_PATH=/lumora` and publishes `./out` to GitHub Pages.

Because the site is served from the `/lumora` sub-path, a base path is applied in
`next.config.mjs`; images are prefixed via `image-loader.js` and raw `<video>` tags
via `process.env.NEXT_PUBLIC_BASE_PATH`.
