<p align="center">
  <img src="https://cdn.molret.dev/seedface-banner.webp" alt="Seedface" width="720" />
</p>

# Seedface

Modern, **framework-agnostic** deterministic placeholder avatar generator.
Same string → same avatar, forever. One tiny **zero-dependency** core engine powers
React, Vue, Svelte, Web Components and a CLI — plus static SVG/PNG export for emails,
OG images and server-rendered lists.

> A modern rewrite inspired by [nusu/avvvatars](https://github.com/nusu/avvvatars)
> (MIT). The 60 base shapes are reused from that project with credit; Seedface adds
> new shapes, themes, adaptive dark mode, more styles and multi-framework support.

## Why Seedface

- ⚡ **Zero dependencies** in the core. Generates a standalone `<svg>` string — no CSS-in-JS, no runtime.
- 🧩 **Multi-framework**: React (RSC-friendly), Vue, Svelte, and a native Web Component.
- 🌗 **Adaptive dark mode**: every theme ships light + dark palettes; the same user keeps their identity.
- 🎨 **7 themes**, 69 shapes, and 5 styles: `character`, `shape`, `gradient`, `rings`, `pixel`.
- 🖥️ **RSC / SSR safe**: avatars are pure static markup — render on the server with zero client JS.
- 🏭 **Performance at scale**: raw SVG generation benchmarks ~100k+ avatars/sec; great for long user lists.
- 🖼️ **Static export**: a CLI emits SVG or PNG for emails, OG images, favicons, etc.
- 🎬 **Subtle, accessible animation**: respects `prefers-reduced-motion`.
- 🔒 **Deterministic**: `cyrb53` hash + `mulberry32` PRNG — stable across machines and versions.

## Install

```bash
npm i seedface
```

```bash
pnpm add seedface
```

```bash
yarn add seedface
```

```bash
bun add seedface
```

Framework peers (only install what you use):

```bash
# React
npm i seedface react react-dom
# Vue
npm i seedface vue
# Svelte
npm i seedface svelte
# PNG export via CLI (optional)
npm i -D @resvg/resvg-js
```

## React (works in Server Components)

```tsx
import { Avatar } from 'seedface/react';

export function User({ email }: { email: string }) {
  return <Avatar value={email} style="shape" theme="ocean" variant="dark" size={48} shadow animated />;
}
```

`variant="auto"` follows `prefers-color-scheme`. Need the raw string?

```ts
import { generateAvatar } from 'seedface';
const { svg, initials, shapeIndex } = generateAvatar({ value: 'luna@x.dev', style: 'pixel' });
```

## Vue

```vue
<script setup>
import { Avatar } from 'seedface/vue';
</script>
<template>
  <Avatar value="luna@x.dev" style="gradient" theme="candy" :size="64" animated />
</template>
```

## Svelte

```svelte
<script>
  import { Avatar } from 'seedface/svelte';
</script>
<Avatar value="luna@x.dev" style="rings" theme="neon" size={64} />
```

## Web Component (any framework, or none)

```html
<script type="module">
  import 'seedface/webcomponent'; // auto-registers <seedface-avatar>
</script>
<seedface-avatar value="luna@x.dev" style="shape" theme="forest" variant="dark" size="64"></seedface-avatar>
```

```js
import { registerSeedface } from 'seedface/webcomponent';
registerSeedface('my-avatar'); // custom tag name
```

## CLI (static SVG / PNG)

```bash
seedface generate --value "jane@doe.com" --style shape --theme sunset --size 128 --out avatar.svg
seedface generate --value "jane@doe.com" --out avatar.png --size 256   # needs sharp
```

## API

`generateAvatar(options)` → `AvatarData`

| Option | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | `string` | — | **required** seed |
| `style` | `character \| shape \| gradient \| rings \| pixel` | `character` | visual style |
| `size` | `number` | `64` | px (8–512) |
| `radius` | `number \| 'full' \| 'none'` | `full` | corner radius |
| `theme` | `string` | `default` | see `listThemes()` |
| `variant` | `light \| dark` | `light` | dark adapts the palette |
| `background` / `color` | `string` | theme | color overrides |
| `displayValue` | `string` | derived | force the initials |
| `border` / `borderSize` / `borderColor` | `boolean` / `number` / `string` | `false` / `2` / auto | |
| `shadow` | `boolean` | `false` | soft drop shadow |
| `animated` | `boolean` | `false` | load + hover animation |
| `salt` | `string \| number` | — | extra entropy |

## Develop

```bash
npm install
npm run build   # tsup → dist (esm + cjs + dts)
npm test        # determinism / style / theme checks
npm run demo    # vite playground (controls + perf test)
```

## License

MIT. Original shapes © [Nusu Alabuga](https://twitter.com/nusualabuga) & [Oguz Yagiz Kara](https://twitter.com/oguzyagizkara), reused under MIT.
