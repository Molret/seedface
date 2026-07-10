import React, { useMemo, useState } from 'react';
import { Avatar } from 'seedface';
import { generateAvatar, THEMES } from 'seedface-core';
import type { AvatarStyle, AvatarVariant, Radius } from 'seedface-core';

const SAMPLE = [
	'ava@seedface.dev', 'Luna Park', 'kenji.tanaka@work.jp', 'maria@gmail.com',
	'Theo', 'oliver@smith.io', 'priya.nair', 'Noah Williams', 'zoe@studio.co',
	'lucas@brazil.br', 'Emilia Rossi', 'arjun@dev.in', 'Mia Chen', 'felix@berlin.de',
	'yuki@tokyo.jp', 'Sofia', 'diego@ar.cl', 'hannah@uk.com', 'leo@paris.fr',
	'nina@oslo.no', 'omar@cairo.eg', 'amy@sf.us', 'ravi@mumbai.in', 'elsa@nord.se',
];

export function App() {
	const [value, setValue] = useState('jane@doe.com');
	const [style, setStyle] = useState<AvatarStyle>('character');
	const [theme, setTheme] = useState('default');
	const [variant, setVariant] = useState<AvatarVariant>('dark');
	const [size, setSize] = useState(120);
	const [radius, setRadius] = useState<Radius>('full');
	const [border, setBorder] = useState(false);
	const [shadow, setShadow] = useState(true);
	const [animated, setAnimated] = useState(true);

	const preview = (
		<Avatar
			value={value}
			style={style}
			theme={theme}
			variant={variant}
			size={size}
			radius={radius}
			border={border}
			borderSize={3}
			shadow={shadow}
			animated={animated}
		/>
	);

	const code = `import { Avatar } from 'seedface/react'

<Avatar
  value="${value}"
  style="${style}"
  theme="${theme}"
  variant="${variant}"
  size={${size}}
  radius="${radius}"
  shadow={${shadow}}
  animated={${animated}}
/>`;

	return (
		<div className="wrap">
			<div className="hero">
				<div className="badge">seedface · v1.0 · zero-dep core</div>
				<h1>Modern placeholder avatars</h1>
				<p>
					Deterministic, framework-agnostic avatar generator. Same string → same avatar,
					forever. React, Vue, Svelte, Web Components and a CLI — one tiny core engine.
				</p>
			</div>

			<div className="preview">
				<div className="stage">{preview}</div>
				<div className="controls">
					<div className="field" style={{ gridColumn: '1 / -1' }}>
						<label>value (seed)</label>
						<input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
					</div>
					<div className="field">
						<label>style</label>
						<select value={style} onChange={(e) => setStyle(e.target.value as AvatarStyle)}>
							{['character', 'shape', 'gradient', 'rings', 'pixel'].map((s) => (
								<option key={s} value={s}>{s}</option>
							))}
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
						<input type="range" min={32} max={240} value={size} onChange={(e) => setSize(+e.target.value)} />
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
					<div className="row" style={{ gridColumn: '1 / -1' }}>
						<label className="check"><input type="checkbox" checked={border} onChange={(e) => setBorder(e.target.checked)} /> border</label>
						<label className="check"><input type="checkbox" checked={shadow} onChange={(e) => setShadow(e.target.checked)} /> shadow</label>
						<label className="check"><input type="checkbox" checked={animated} onChange={(e) => setAnimated(e.target.checked)} /> animated</label>
					</div>
				</div>
			</div>

			<div className="section">
				<h2>Themes</h2>
				<p className="sub">7 palettes, each with adaptive light + dark variants.</p>
				<div className="themes">
					{THEMES.map((t) => (
						<button key={t.id} className={`chip ${theme === t.id ? 'active' : ''}`} onClick={() => setTheme(t.id)}>
							{t.name}
						</button>
					))}
				</div>
			</div>

			<div className="section">
				<h2>Variety</h2>
				<p className="sub">Same settings, different seeds — every avatar is unique & stable.</p>
				<div className="grid">
					{SAMPLE.map((v) => (
						<Avatar key={v} value={v} style={style} theme={theme} variant={variant} size={48} radius="full" shadow={false} />
					))}
				</div>
			</div>

			<PerfSection style={style} theme={theme} variant={variant} />

			<div className="section">
				<h2>Usage</h2>
				<div className="code">{code}</div>
			</div>
		</div>
	);
}

function PerfSection({ style, theme, variant }: { style: AvatarStyle; theme: string; variant: AvatarVariant }) {
	const [count, setCount] = useState(1000);
	const [html, setHtml] = useState('');
	const [ms, setMs] = useState(0);

	const run = () => {
		const t0 = performance.now();
		let out = '';
		for (let i = 0; i < count; i++) {
			const v = `user-${i}@seedface.dev`;
			out += generateAvatar({ value: v, style, theme, variant, size: 40 }).svg;
		}
		setHtml(out);
		setMs(performance.now() - t0);
	};

	useMemo(run, [count, style, theme, variant]);

	return (
		<div className="section">
			<h2>Performance at scale</h2>
			<p className="sub">Raw SVG generation (no framework). Render {count.toLocaleString()} avatars:</p>
			<div className="perfbar">
				<input type="range" min={100} max={5000} step={100} value={count} onChange={(e) => setCount(+e.target.value)} style={{ flex: 1 }} />
				<button className="chip" onClick={run}>re-render</button>
				<div className="stat"><b>{ms.toFixed(1)}ms</b><span>generation time</span></div>
				<div className="stat"><b>{(count / (ms / 1000)).toFixed(0)}</b><span>avatars / sec</span></div>
			</div>
			<div className="grid" style={{ maxHeight: 360, overflow: 'auto' }} dangerouslySetInnerHTML={{ __html: html }} />
		</div>
	);
}
