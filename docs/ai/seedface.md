# Seedface: AI Engineering Guide

This is the compact source of truth for an AI agent modifying Seedface.

## Product contract

Seedface is a deterministic placeholder-avatar generator. `generateAvatar({ value })` returns complete standalone SVG plus metadata. It does not require a browser, React, CSS-in-JS, network access, or runtime dependencies in the core.

The primary invariant is: equal inputs produce equal output. The generator combines a string hash with a seeded PRNG. Do not introduce timestamps, browser randomness, locale-dependent formatting, or unstable IDs into avatar output.

## Repository map

| Area | Files | Responsibility |
| --- | --- | --- |
| Public core | `src/core/index.ts` | Package exports |
| Generation | `src/core/generate.ts` | Options, seed, palette, SVG, memoization |
| Contracts | `src/core/types.ts` | `AvatarOptions`, `AvatarData`, unions |
| Themes | `src/core/themes.ts`, `themes-helpers.ts` | Palettes and `listThemes()` |
| Visual primitives | `src/core/shapes.ts` | Shape paths and count |
| Randomness | `src/core/hash.ts`, `prng.ts` | Stable hashing and RNG |
| Adapters | `src/react.tsx`, `src/vue/Avatar.vue`, `src/svelte/Avatar.svelte`, `src/webcomponent.ts` | Framework integrations |
| CLI | `src/cli.ts` | SVG stdout/file and optional PNG |
| Verification | `test/run.ts` | Determinism, styles, themes, boundaries |

## Core API

```ts
import { generateAvatar } from 'seedface';
const avatar = generateAvatar({ value: 'luna@x.dev', style: 'shape', theme: 'ocean', variant: 'dark', size: 64 });
// avatar.svg, avatar.initials, avatar.background, avatar.color
```

`value` is the identity seed. Styles are `character`, `shape`, `gradient`, `rings`, and `pixel`. Size is rounded and clamped to 8–512px. Radius accepts a pixel number, `'full'`, or `'none'`. Unknown themes fall back to `default`.

The generator derives initials from the value unless `displayValue` is supplied. `background` and `color` overrides currently accept only 3- or 6-digit hexadecimal values, with or without `#`. It XML-escapes user-controlled SVG content. Preserve this whenever adding SVG.

## Framework rules

- React renders synchronous static markup and must remain RSC-friendly.
- React, Vue, and Svelte support `variant="auto"` through `matchMedia`; server fallback is light.
- The Web Component parses attributes, renders in an open Shadow DOM, and skips rendering without `value`.
- Keep adapter options aligned with `AvatarOptions`.

## Themes and visual changes

Themes contain `id`, `name`, `description`, `light`, and derived `dark` palettes. Add themes in `src/core/themes.ts`; `THEME_MAP` and `listThemes()` derive automatically. Avoid changing existing palettes or shape ordering casually: that changes established identities.

## CLI behavior

The CLI requires `--value`, emits SVG to stdout when `--out` is absent, and writes `.svg` or PNG. PNG requires optional `@resvg/resvg-js`; keep docs and implementation synchronized.

## Change checklist

1. Prefer core changes, then thread public options through every adapter and CLI.
2. Preserve deterministic output, exports, SVG escaping, SSR safety, and reduced-motion behavior.
3. Run `npm run typecheck`, `npm test`, and `npm run build`.
4. Update `README.md`, `llms.txt`, and this guide when public behavior changes.

Do not add runtime dependencies to `src/core`, use ambient randomness, make browser globals mandatory for SSR, silently rename public styles/themes/exports, or regenerate shape order without a migration decision.
