---
name: seedface
description: Use when developing, debugging, documenting, or integrating the Seedface deterministic avatar library. Covers its zero-dependency TypeScript core, stable SVG generation, themes, styles, framework adapters, CLI, SSR/RSC constraints, and validation workflow.
---

# Seedface Skill

Read [seedface.md](seedface.md) before non-trivial changes.

## Workflow

1. Identify whether the change belongs in `src/core` or an adapter.
2. Treat `src/core/types.ts` as the API contract.
3. Preserve deterministic output for identical options.
4. Preserve zero dependencies in the core and SSR/RSC compatibility.
5. Escape all user-controlled values embedded in SVG.
6. If adding a public option, update core, every adapter, CLI, tests, README, `llms.txt`, and the AI guide as applicable.
7. Validate with `npm run typecheck`, `npm test`, and `npm run build`.

## Defaults and invariants

- style: `character`; size: `64`, clamped to `8..512`; radius: `full`
- theme: `default`; core variant: `light`; adapters may support `auto`
- styles: `character`, `shape`, `gradient`, `rings`, `pixel`
- unknown themes fall back to `default`
- animation must respect `prefers-reduced-motion`

Never introduce timestamps or ambient randomness. Avoid changing existing theme palette or shape ordering because it changes established avatars.

React's `Avatar` is synchronous static markup and must remain RSC-friendly. Vue and Svelte mirror core options. The Web Component uses attributes and an open Shadow DOM. The CLI requires `--value`; PNG uses optional `@resvg/resvg-js`.
