---
name: seedface
description: Use when developing, debugging, documenting, or integrating Seedface, a deterministic zero-dependency TypeScript avatar generator with SVG output, themes, styles, React/Vue/Svelte/Web Component adapters, SSR/RSC support, and CLI export.
---

# Seedface

Seedface generates deterministic placeholder avatars. The same `value` and options must produce the same avatar across machines and renders.

## Repository map

- `src/core/types.ts`: canonical `AvatarOptions` and `AvatarData` contracts.
- `src/core/generate.ts`: seeded generation, palette resolution, SVG rendering, and cache.
- `src/core/themes.ts`: seven themes and derived dark palettes.
- `src/core/shapes.ts`: 69 shape paths; preserve ordering for identity stability.
- `src/react.tsx`, `src/vue/Avatar.vue`, `src/svelte/Avatar.svelte`, `src/webcomponent.ts`: adapters.
- `src/cli.ts`: SVG and optional PNG export.
- `test/run.ts`: determinism and behavior checks.

## API invariants

- Styles: `character`, `shape`, `gradient`, `rings`, `pixel`.
- Defaults: style `character`, size `64`, radius `full`, theme `default`, variant `light`.
- Size is rounded and clamped to `8..512`.
- Radius is a pixel number, `full`, or `none`.
- Unknown theme IDs fall back to `default`.
- `background` and `color` overrides accept 3- or 6-digit hexadecimal values, with or without `#`.
- `displayValue` overrides derived initials; user-controlled SVG content must remain XML-escaped.

## Safe change workflow

1. Decide whether the change belongs in the core or an adapter.
2. If adding a public option, thread it through every relevant adapter and the CLI.
3. Never introduce timestamps, ambient randomness, browser-only requirements, or runtime dependencies into `src/core`.
4. Preserve SSR/RSC behavior and `prefers-reduced-motion` handling.
5. Do not casually change existing palettes, themes, style names, exports, or shape order: they affect established avatars.
6. Keep CLI help synchronized. PNG output requires optional `@resvg/resvg-js`.
7. Validate with:

```bash
npm run typecheck
npm test
npm run build
```

React `Avatar` renders synchronous static markup and must remain RSC-friendly. React, Vue, and Svelte may resolve `variant="auto"` with `matchMedia`, using light as the server fallback. The Web Component parses attributes and renders in an open Shadow DOM.
