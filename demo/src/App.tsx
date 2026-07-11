import React, { useMemo, useState } from 'react';
import { Avatar } from 'seedface';
import { generateAvatar, THEMES } from 'seedface-core';
import type { AvatarStyle, AvatarVariant, Radius } from 'seedface-core';

const STYLES: AvatarStyle[] = ['character', 'shape', 'gradient', 'rings', 'pixel'];
const SAMPLE = [
	'ava@seedface.dev', 'Luna Park', 'kenji.tanaka@work.jp', 'maria@gmail.com',
	'Theo', 'oliver@smith.io', 'priya.nair', 'Noah Williams', 'zoe@studio.co',
	'lucas@brazil.br', 'Emilia Rossi', 'arjun@dev.in', 'Mia Chen', 'felix@berlin.de',
	'yuki@tokyo.jp', 'Sofia', 'diego@ar.cl', 'hannah@uk.com', 'leo@paris.fr',
	'nina@oslo.no', 'omar@cairo.eg', 'amy@sf.us', 'ravi@mumbai.in', 'elsa@nord.se',
];

const FEATURES = [
	{ ico: '⚡', h: 'Zero dependencies', p: 'Core emits a standalone SVG string — no CSS-in-JS, no runtime.' },
	{ ico: '🧩', h: 'Multi-framework', p: 'React (RSC), Vue, Svelte and a native Web Component from one engine.' },
	{ ico: '🌗', h: 'Adaptive dark mode', p: 'Every theme ships light + dark palettes; users keep their identity.' },
	{ ico: '🎨', h: '7 themes · 69 shapes', p: 'Five styles: character, shape, gradient, rings and pixel.' },
	{ ico: '🖥️', h: 'RSC / SSR safe', p: 'Pure static markup renders on the server with zero client JS.' },
	{ ico: '🏭', h: 'Fast at scale', p: '~100k avatars/sec — perfect for long user lists.' },
	{ ico: '🖼️', h: 'Static export', p: 'A CLI emits SVG or PNG for emails, OG images and favicons.' },
	{ ico: '🔒', h: 'Deterministic', p: 'cyrb53 + mulberry32 — stable across machines and versions.' },
];

export function App() {
	const [value, setValue] = useState('jane@doe.com');
	const [style, setStyle] = useState<AvatarStyle>('character');
	const [theme, setTheme] = useState('default');
	const [variant, setVariant] = useState<AvatarVariant>('dark');
	const [size, setSize] = useState(132);
	const [radius, setRadius] = useState<Radius>('full');
	const [border, setBorder] = useState(false);
	const [shadow, setShadow] = useState(true);
	const [animated, setAnimated] = useState(true);
	const [tab, setTab] = useState('react');

	const opts: CodeOpts = { value, style, theme, variant, size, radius, border, shadow, animated };
	const preview = <Avatar {...opts} />;

	const code = useMemo(() => buildCode(tab, opts), [tab, value, style, theme, variant, size, radius, border, shadow, animated]);

	return (
		<div className="wrap">
			<header className="hero">
				<img className="banner" src="https://cdn.molret.dev/seedface-banner.webp" alt="Seedface" />
				<h1>Seedface</h1>
				<p>Modern, framework-agnostic placeholder avatars. Same string → same avatar, forever.</p>
				<div className="badges">
					<span className="badge">zero-dep core</span>
					<span className="badge">RSC / SSR safe</span>
					<span className="badge">~100k avatars / sec</span>
					<span className="badge">MIT</span>
				</div>
				<div className="cta">
					<a className="btn primary" href="https://www.npmjs.com/package/seedface">npm i seedface</a>
					<a className="btn" href="https://github.com/molret/seedface">GitHub</a>
				</div>
			</header>

			<section className="section">
				<h2>Why Seedface</h2>
				<div className="features">
					{FEATURES.map((f) => (
						<div className="feature" key={f.h}>
							<div className="ico">{f.ico}</div>
							<h3>{f.h}</h3>
							<p>{f.p}</p>
						</div>
					))}
				</div>
			</section>

			<section className="section">
				<h2>Playground</h2>
				<p className="sub">Tweak it live — the code updates for every framework.</p>
				<div className="playground">
					<div className="card">
						<div className="stage">{preview}</div>
					</div>
					<div className="card">
						<div className="controls">
							<div className="field full">
								<label>value (seed)</label>
								<input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
							</div>
							<div className="field">
								<label>style</label>
								<select value={style} onChange={(e) => setStyle(e.target.value as AvatarStyle)}>
									{STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
								</select>
							</div>
							<div className="field">
								<label>variant</label>
								<select value={variant} onChange={(e) => setVariant(e.target.value as AvatarVariant)}>
									<option value="light">light</option>
									<option value="dark">dark</option>
								</select>
							</div>
							<div className="field">
								<label>size · {size}px</label>
								<input type="range" min={32} max={256} value={size} onChange={(e) => setSize(+e.target.value)} />
							</div>
							<div className="field">
								<label>radius · {String(radius)}</label>
								<select value={radius} onChange={(e) => setRadius(e.target.value as Radius)}>
									<option value="full">full</option>
									<option value="none">none</option>
									<option value="16">16</option>
									<option value="8">8</option>
								</select>
							</div>
							<div className="field full">
								<div className="row">
									<label className="check"><input type="checkbox" checked={border} onChange={(e) => setBorder(e.target.checked)} /> border</label>
									<label className="check"><input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} /> shadow</label>
									<label className="check"><input type="checkbox" checked={animated} onChange={(e) => setAnimated(e.target.checked)} /> animated</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card" style={{ marginTop: 18 }}>
					<div className="tabs">
						{['react', 'vue', 'svelte', 'webcomponent', 'cli'].map((t) => (
							<button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</button>
						))}
					</div>
					<div className="code">{code}</div>
				</div>
			</section>

			<section className="section">
				<h2>Themes</h2>
				<p className="sub">7 palettes, each with adaptive light + dark variants.</p>
				<div className="chips">
					{THEMES.map((t) => (
						<button key={t.id} className={`chip ${theme === t.id ? 'active' : ''}`} onClick={() => setTheme(t.id)}>{t.name}</button>
					))}
				</div>
				<div className="grid">
					{SAMPLE.map((v) => (
						<Avatar key={v} value={v} style={style} theme={theme} variant={variant} size={46} radius="full" shadow={false} />
					))}
				</div>
			</section>

			<section className="section">
				<h2>Styles</h2>
				<p className="sub">Five visual styles from a single API.</p>
				<div className="stylegrid">
					{STYLES.map((s) => (
						<div className="stylecard" key={s}>
							<Avatar value="seedface" style={s} theme={theme} variant={variant} size={72} radius="full" shadow />
							<span>{s}</span>
						</div>
					))}
				</div>
			</section>

			<PerfSection style={style} theme={theme} variant={variant} />

			<footer className="footer">
				MIT licensed · Original shapes ©{' '}
				<a href="https://twitter.com/nusualabuga">Nusu Alabuga</a> &{' '}
				<a href="https://twitter.com/oguzyagizkara">Oguz Yagiz Kara</a> · Banner by{' '}
				<a href="https://github.com/molret">Molret</a>
			</footer>
		</div>
	);
}

type CodeOpts = {
	value: string;
	style: AvatarStyle;
	theme: string;
	variant: AvatarVariant;
	size: number;
	radius: Radius;
	border: boolean;
	shadow: boolean;
	animated: boolean;
};

const DEFAULT_OPTS: CodeOpts = {
	value: '', style: 'character', theme: 'default', variant: 'dark',
	size: 64, radius: 'full', border: false, shadow: false, animated: false,
};

function buildCode(kind: string, o: CodeOpts) {
	const v = o.value;
	switch (kind) {
		case 'react':
			return `import { Avatar } from 'seedface/react'

<Avatar
  value="${v}"
  style="${o.style}"
  theme="${o.theme}"
  variant="${o.variant}"
  size={${o.size}}
  radius="${o.radius}"
  border={${o.border}}
  shadow={${o.shadow}}
  animated={${o.animated}}
/>`;
		case 'vue':
			return `<script setup>
import { Avatar } from 'seedface/vue'
</script>

<template>
  <Avatar value="${v}" style="${o.style}" theme="${o.theme}"
    variant="${o.variant}" :size="${o.size}" :border="${o.border}"
    :shadow="${o.shadow}" :animated="${o.animated}" />
</template>`;
		case 'svelte':
			return `<script>
  import { Avatar } from 'seedface/svelte'
</script>

<Avatar value="${v}" style="${o.style}" theme="${o.theme}"
  variant="${o.variant}" size={${o.size}} border={${o.border}}
  shadow={${o.shadow}} animated={${o.animated}} />`;
		case 'webcomponent':
			return `<script type="module">
  import 'seedface/webcomponent'
</script>

<seedface-avatar
  value="${v}"
  style="${o.style}"
  theme="${o.theme}"
  variant="${o.variant}"
  size="${o.size}"
  radius="${o.radius}"
  border="${o.border}"
  shadow="${o.shadow}"
  animated="${o.animated}"></seedface-avatar>`;
		case 'cli':
		default:
			return `seedface generate \\\n  --value "${v}" \\\n  --style ${o.style} \\\n  --theme ${o.theme} \\\n  --variant ${o.variant} \\\n  --size ${o.size} \\\n  --radius ${o.radius} \\\n  ${o.border ? '--border \\\n  ' : ''}${o.shadow ? '--shadow \\\n  ' : ''}${o.animated ? '--animated \\\n  ' : ''}--out avatar.svg`;
	}
}

function PerfSection({ style, theme, variant }: { style: AvatarStyle; theme: string; variant: AvatarVariant }) {
	const [count, setCount] = useState(1000);
	const [html, setHtml] = useState('');
	const [ms, setMs] = useState(0);

	const run = () => {
		const t0 = performance.now();
		let out = '';
		for (let i = 0; i < count; i++) {
			out += generateAvatar({ value: `user-${i}@seedface.dev`, style, theme, variant, size: 40 }).svg;
		}
		setHtml(out);
		setMs(performance.now() - t0);
	};

	useMemo(run, [count, style, theme, variant]);

	return (
		<section className="section">
			<h2>Performance at scale</h2>
			<p className="sub">Raw SVG generation (no framework). Render {count.toLocaleString()} avatars:</p>
			<div className="perfbar">
				<input type="range" min={100} max={5000} step={100} value={count} onChange={(e) => setCount(+e.target.value)} style={{ flex: 1, accentColor: '#7c5cff' }} />
				<button className="chip" onClick={run}>re-render</button>
				<div className="stat"><b>{ms.toFixed(1)}ms</b><span>generation time</span></div>
				<div className="stat"><b>{(count / (ms / 1000)).toFixed(0)}</b><span>avatars / sec</span></div>
			</div>
			<div className="grid" style={{ maxHeight: 340, overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: html }} />
		</section>
	);
}
