# storyboard-cdn

Auto-generated CDN assets for the Storyboard Studio Pro Canvas deployment.

Source of truth: `index.html` in the private repo `arulbarker/canvas-gemini-storyboard-studio-pro`.
Built by `scripts/build-cdn.mjs` in that repo. Do not edit files here by hand —
changes will be overwritten on the next build.

Files:
- `bundle-classic.js` — concatenated inline classic <script> blocks
- `bundle-module.js` — inline type="module" script (empty if none)
- `styles.css` — extracted <style> contents
- `body.html` — <body> innerHTML (sidebar, 10 panels, login overlay, modals)
- `bootstrap.js` — runtime loader chained by the Canvas shell HTML

Served via jsDelivr at:
```
https://cdn.jsdelivr.net/gh/arulbarker/storyboard-cdn@main/<file>
```

Last build: 2026-08-13T11:31:06.277Z
