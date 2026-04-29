# Widget App

## What This Is
A standalone JavaScript widget injected into third-party websites via a `<script>` tag.
Renders a floating chat button + chat UI for Proply's AI chatbot.

## Build Tool
Uses **Vite** (not Bun's bundler) — we need library mode with IIFE output and CSS inlining.
Do not suggest switching to Bun build or any other bundler.

## Tech
- Preact (not React) — small bundle size is critical
- UnoCSS via `unocss/vite` in `mode: 'shadow-dom'` — `@unocss-placeholder` in `src/index.css` is replaced with generated utilities; CSS imported via `?inline` and injected into shadow root
- Vite in library mode → outputs single `dist/widget.js`
- Shadow DOM for style isolation — CSS must never leak to the host page

## Build Output
- Format: IIFE (immediately invoked, runs on script load)
- Single file: `dist/widget.js` — no separate CSS file
- CSS is inlined into the JS bundle (`cssCodeSplit: false`)
- Global name: `ProplyWidget`

## Entry Point
`src/index.ts` — reads `data-tenant-id` from the script tag, mounts the widget

## Style Rules
- All UnoCSS styles must be injected into the Shadow DOM, not the document
- Never inject styles via `document.head` — use the shadow root
- Never use CSS classes that could conflict with the host page
- Theme tokens are CSS variables on `:host` in `src/index.css` — override per-tenant at runtime to re-theme

## Deployment
Cloudflare Pages — has its own `wrangler.jsonc`
