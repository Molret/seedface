import React, { useMemo, useState } from 'react';
import { Avatar } from 'seedface';
import { THEMES } from 'seedface-core';
import type { AvatarStyle, AvatarVariant, Radius } from 'seedface-core';

const STYLES: AvatarStyle[] = ['character', 'shape', 'gradient', 'rings', 'pixel'];
const TABS = ['react', 'vue', 'svelte', 'html', 'cli'] as const;
type CodeTab = (typeof TABS)[number];
type PackageManager = 'npm' | 'pnpm' | 'yarn';

const HERO_FACES = [
	{ value: 'Luna Park', style: 'character', theme: 'candy', className: 'face-a' },
	{ value: 'Kenji Tanaka', style: 'shape', theme: 'ocean', className: 'face-b' },
	{ value: 'Maya Angelou', style: 'shape', theme: 'forest', className: 'face-c' },
	{ value: 'Noah Williams', style: 'character', theme: 'neon', className: 'face-d' },
	{ value: 'Sofia Rossi', style: 'character', theme: 'sunset', className: 'face-e' },
	{ value: 'Omar Cairo', style: 'shape', theme: 'mono', className: 'face-f' },
	{ value: 'Priya Nair', style: 'character', theme: 'forest', className: 'face-g' },
	{ value: 'Theo Martin', style: 'shape', theme: 'candy', className: 'face-h' },
] satisfies Array<{ value: string; style: AvatarStyle; theme: string; className: string }>;

const GALLERY = [
	'Ava Stone', 'Luna Park', 'Kenji Tanaka', 'Maria Sol', 'Theo', 'Oliver Smith',
	'Priya Nair', 'Noah Williams', 'Zoe Studio', 'Lucas Silva', 'Emilia Rossi',
	'Arjun Dev', 'Mia Chen', 'Felix Berlin', 'Yuki Tokyo', 'Sofia', 'Diego Sur', 'Nina Oslo',
];

const INSTALL_COMMANDS: Record<PackageManager, string> = {
	npm: 'npm install seedface',
	pnpm: 'pnpm add seedface',
	yarn: 'yarn add seedface',
};

export function App() {
	const [value, setValue] = useState('jane@doe.com');
	const [style, setStyle] = useState<AvatarStyle>('character');
	const [theme, setTheme] = useState('candy');
	const [variant, setVariant] = useState<AvatarVariant>('light');
	const [size, setSize] = useState(220);
	const [radius, setRadius] = useState<Radius>('full');
	const [border, setBorder] = useState(false);
	const [shadow, setShadow] = useState(true);
	const [animated, setAnimated] = useState(true);
	const [tab, setTab] = useState<CodeTab>('react');
	const [copied, setCopied] = useState(false);
	const [packageManager, setPackageManager] = useState<PackageManager>('npm');

	const opts: CodeOpts = { value, style, theme, variant, size, radius, border, shadow, animated };
	const code = useMemo(() => buildCode(tab, opts), [tab, value, style, theme, variant, size, radius, border, shadow, animated]);

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch {
			setCopied(false);
		}
	}

	return (
		<div className="site-shell">
			<header className="hero" id="top">
				<nav className="nav page-width" aria-label="Primary navigation">
					<a className="brand brand-word" href="#top" aria-label="Seedface home">Seedface</a>
					<div className="nav-links">
						<a href="#why">Why Seedface</a>
						<a href="#playground">Playground</a>
						<a href="https://github.com/molret/seedface">Docs</a>
					</div>
					<a className="github-button" href="https://github.com/molret/seedface" aria-label="View Seedface on GitHub">
						<GitHubIcon />
						<span>GitHub</span>
					</a>
				</nav>

				<div className="face-orbit" aria-hidden="true">
					{HERO_FACES.map((face) => (
						<div className={`floating-face ${face.className}`} key={face.value}>
							<div className="floating-face-inner">
								<Avatar value={face.value} style={face.style} theme={face.theme} variant="light" size={96} radius={face.className === 'face-b' || face.className === 'face-f' ? 18 : 'full'} shadow={false} />
							</div>
						</div>
					))}
				</div>

				<div className="hero-copy page-width">
					<div className="eyebrow"><span className="spark" aria-hidden="true" /> Open-source avatar engine</div>
					<h1>A face for<br />every seed.</h1>
					<p>Deterministic avatars for React, Vue, Svelte and the web. Same string, same face — forever.</p>
					<div className="hero-actions">
						<a className="button button-dark" href="#playground">Try the playground <ArrowRightIcon /></a>
						<a className="install-command" href="https://www.npmjs.com/package/seedface" aria-label="Install Seedface from npm">
							<code>npm i seedface</code>
							<ArrowUpRightIcon />
						</a>
					</div>
				</div>

				<div className="hero-proof page-width" aria-label="Seedface highlights">
					<span>Zero dependencies</span>
					<span>69 shapes</span>
					<span>SVG native</span>
					<span>MIT licensed</span>
				</div>
			</header>

			<main>
				<section className="install-steps page-width" aria-labelledby="install-title">
					<div className="install-heading">
						<div>
							<div className="section-kicker"><span>01</span> From package to face</div>
							<h2 id="install-title">Installed before your coffee cools.</h2>
						</div>
						<p>Choose your package manager. The terminal shows the complete path from dependency to rendered avatar.</p>
					</div>
					<div className="install-workbench">
						<div className="manager-picker" role="tablist" aria-label="Choose a package manager">
							<ManagerButton manager="npm" active={packageManager === 'npm'} onClick={setPackageManager} />
							<ManagerButton manager="pnpm" active={packageManager === 'pnpm'} onClick={setPackageManager} />
							<ManagerButton manager="yarn" active={packageManager === 'yarn'} onClick={setPackageManager} />
						</div>
						<div className="install-terminal" role="region" aria-live="polite" aria-label={`${packageManager} installation steps`}>
							<div className="terminal-bar">
								<span><i /><i /><i /></span>
								<code>seedface — quick start</code>
								<button type="button" onClick={() => navigator.clipboard.writeText(INSTALL_COMMANDS[packageManager])} aria-label="Copy install command"><CopyIcon /></button>
							</div>
							<ol className="terminal-steps">
								<TerminalStep number="1" label="Install" command={INSTALL_COMMANDS[packageManager]} />
								<TerminalStep number="2" label="Import" command="import { Avatar } from 'seedface/react'" />
								<TerminalStep number="3" label="Render" command={'<Avatar value="luna@studio.co" />'} />
							</ol>
						</div>
					</div>
				</section>

				<section className="personality page-width" id="why" aria-labelledby="personality-title">
					<div className="personality-heading">
						<div className="section-kicker"><span>02</span> The tiny identity layer</div>
						<h2 id="personality-title">Tiny engine.<br />Big personality<span>.</span></h2>
						<p>One zero-dependency core creates stable, accessible SVG avatars everywhere your product lives.</p>
					</div>

					<div className="avatar-ribbon" aria-label="Seedface avatar examples">
						{GALLERY.map((name, index) => (
							<div className={`ribbon-avatar ribbon-${index % 3}`} key={name}>
								<Avatar
									value={name}
									style={index % 2 === 0 ? 'character' : 'shape'}
									theme={THEMES[index % THEMES.length].id}
									variant={index % 5 === 0 ? 'dark' : 'light'}
									size={88}
									radius={index % 3 === 0 ? 20 : 'full'}
								/>
							</div>
						))}
					</div>

					<div className="capability-grid">
						<article className="capability capability-coral">
							<span className="capability-symbol" aria-hidden="true">●</span>
							<h3>Zero<br />dependencies</h3>
							<p>Standalone SVG output. No CSS-in-JS, no runtime, no baggage.</p>
						</article>
						<article className="capability capability-framework">
							<h3>Every<br />framework</h3>
							<p>One core, native ergonomics everywhere.</p>
							<FrameworkRail />
						</article>
						<article className="capability capability-speed">
							<strong>~100k</strong>
							<h3>avatars/sec</h3>
							<p>Raw deterministic SVG generation built for very long lists.</p>
						</article>
						<article className="capability capability-dark">
							<span className="dot-matrix" aria-hidden="true">⠿</span>
							<h3>Dark mode<br />native</h3>
							<p>Every theme includes a tuned light and dark identity.</p>
						</article>
					</div>
				</section>

				<section className="playground-section" id="playground" aria-labelledby="playground-title">
					<div className="playground-intro page-width">
						<div className="section-kicker"><span>03</span> Your turn</div>
						<h2 id="playground-title">Make someone<span>.</span></h2>
						<p>Type anything. Seedface turns it into a stable visual identity.</p>
					</div>

					<div className="playground-stage">
						<div className="playground-inner page-width">
							<div className="avatar-stage" aria-live="polite">
								<div className="orbit-line" aria-hidden="true" />
								<div className="preview-main">
									<Avatar {...opts} />
								</div>
								<div className="preview-mini mini-one"><Avatar {...opts} style="character" size={64} radius="full" shadow={false} animated={false} /></div>
								<div className="preview-mini mini-two"><Avatar {...opts} style="shape" size={56} radius={14} shadow={false} animated={false} /></div>
								<p className="preview-label"><span>Seed</span>{value || 'empty seed'}</p>
							</div>

							<div className="control-panel">
								<div className="control-field control-field-full">
									<label htmlFor="seed-value">Seed text</label>
									<input id="seed-value" type="text" value={value} onChange={(event) => setValue(event.target.value)} />
								</div>

								<fieldset className="control-field control-field-full">
									<legend>Style</legend>
									<div className="segmented-control">
										{STYLES.map((item) => (
											<button type="button" className={style === item ? 'active' : ''} onClick={() => setStyle(item)} aria-pressed={style === item} key={item}>{item}</button>
										))}
									</div>
								</fieldset>

								<fieldset className="control-field control-field-full">
									<legend>Theme</legend>
									<div className="theme-swatches">
										{THEMES.map((item, index) => (
											<button
												type="button"
												className={theme === item.id ? 'active' : ''}
												onClick={() => setTheme(item.id)}
												aria-label={`Use ${item.name} theme`}
												aria-pressed={theme === item.id}
												style={{ '--swatch': item.light[index % item.light.length].bg } as React.CSSProperties}
											/>
										))}
									</div>
								</fieldset>

								<div className="control-field range-field">
									<label htmlFor="avatar-size">Size <output>{size}px</output></label>
									<input id="avatar-size" type="range" min={96} max={280} value={size} onChange={(event) => setSize(Number(event.target.value))} />
								</div>

								<div className="control-field compact-field">
									<label htmlFor="avatar-radius">Corners</label>
									<select id="avatar-radius" value={radius} onChange={(event) => setRadius(event.target.value as Radius)}>
										<option value="full">Round</option>
										<option value="20">Soft</option>
										<option value="none">Square</option>
									</select>
								</div>

								<div className="toggle-row control-field-full">
									<Toggle label="Dark mode" checked={variant === 'dark'} onChange={(checked) => setVariant(checked ? 'dark' : 'light')} />
									<Toggle label="Border" checked={border} onChange={setBorder} />
									<Toggle label="Shadow" checked={shadow} onChange={setShadow} />
									<Toggle label="Motion" checked={animated} onChange={setAnimated} />
								</div>

								<div className="code-panel control-field-full">
									<div className="code-toolbar">
										<div className="code-tabs" role="tablist" aria-label="Framework code examples">
											{TABS.map((item) => <button type="button" role="tab" aria-selected={tab === item} className={tab === item ? 'active' : ''} onClick={() => setTab(item)} key={item}>{item === 'html' ? 'HTML' : item}</button>)}
										</div>
										<button type="button" className="copy-button" onClick={copyCode}><CopyIcon /> {copied ? 'Copied!' : 'Copy code'}</button>
									</div>
									<pre><code>{code}</code></pre>
									<span className="sr-only" role="status" aria-live="polite">{copied ? 'Code copied to clipboard' : ''}</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="final-cta" aria-labelledby="cta-title">
					<div className="cta-faces" aria-hidden="true">
						{GALLERY.slice(0, 10).map((name, index) => (
							<div className={`cta-face cta-face-${index + 1}`} key={name}>
								<Avatar value={name} style={index % 2 ? 'shape' : 'character'} theme={THEMES[index % THEMES.length].id} variant="light" size={72} radius={index % 2 ? 'full' : 16} />
							</div>
						))}
					</div>
					<div className="final-cta-copy page-width">
						<h2 id="cta-title">Give every<br />user a face<span>.</span></h2>
						<div className="final-actions">
							<a className="button button-dark" href="https://www.npmjs.com/package/seedface">Install Seedface</a>
							<a className="button button-outline" href="https://github.com/molret/seedface"><GitHubIcon /> View on GitHub</a>
						</div>
						<a className="product-hunt-badge" href="https://www.producthunt.com/products/seedface-a-face-for-every-seed?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-seedface-a-face-for-every-seed" target="_blank" rel="noopener noreferrer">
							<img alt="Seedface — a face for every seed - Deterministic avatars for React, Vue, Svelte &amp; CLI | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1193347&amp;theme=light&amp;t=1783737342278" />
						</a>
					</div>
				</section>
			</main>

			<footer className="footer-wrap">
				<div className="footer page-width">
					<div className="footer-brand">
						<a className="brand brand-word" href="#top">Seedface</a>
						<p>One seed in. One identity out.</p>
					</div>
					<div className="footer-command">
						<span>Start building</span>
						<code>npm i seedface</code>
					</div>
					<div className="footer-links">
						<a href="https://github.com/molret/seedface#readme">Docs</a>
						<a href="https://www.npmjs.com/package/seedface">npm</a>
						<a href="https://github.com/molret/seedface">GitHub</a>
						<a href="https://github.com/molret/seedface/blob/main/LICENSE">MIT License</a>
					</div>
					<p className="credits">Shapes credited to Avvvatars · Built openly by Molret.</p>
				</div>
			</footer>
		</div>
	);
}

function ManagerButton({ manager, active, onClick }: { manager: PackageManager; active: boolean; onClick: (manager: PackageManager) => void }) {
	return (
		<button type="button" role="tab" aria-selected={active} className={active ? 'active' : ''} onClick={() => onClick(manager)}>
			<BrandIcon brand={manager} />
			<span>{manager}</span>
			<small>{manager === 'npm' ? 'Universal default' : manager === 'pnpm' ? 'Fast + efficient' : 'Classic workflow'}</small>
		</button>
	);
}

function TerminalStep({ number, label, command }: { number: string; label: string; command: string }) {
	return <li><span>{number}</span><div><small>{label}</small><code><i aria-hidden="true">$</i> {command}</code></div></li>;
}

function FrameworkRail() {
	const frameworks = [
		{ id: 'react', name: 'React' },
		{ id: 'vue', name: 'Vue' },
		{ id: 'svelte', name: 'Svelte' },
		{ id: 'webcomponents', name: 'Web Components' },
		{ id: 'cli', name: 'CLI' },
	];
	const group = (suffix: string, hidden = false) => (
		<div className="framework-group" aria-hidden={hidden || undefined}>
			{frameworks.map((framework) => <div className={`framework-item framework-${framework.id}`} key={`${framework.id}-${suffix}`}><BrandIcon brand={framework.id} /><span>{framework.name}</span></div>)}
		</div>
	);
	return <div className="framework-rail"><div className="framework-track">{group('a')}{group('b', true)}</div></div>;
}

function BrandIcon({ brand }: { brand: string }) {
	switch (brand) {
		case 'npm':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019l-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" /></svg>;
		case 'pnpm':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM2 2h3.5v3.5H2zm8.25 0h3.498v3.5H10.25zm8.25 0H22v3.5h-3.5zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zm2 2H22v3.5h-3.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" /></svg>;
		case 'yarn':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12s12-5.375 12-12S18.625 0 12 0m.768 4.105c.183 0 .363.053.525.157c.125.083.287.185.755 1.154c.31-.088.468-.042.551-.019c.204.056.366.19.463.375c.477.917.542 2.553.334 3.605c-.241 1.232-.755 2.029-1.131 2.576c.324.329.778.899 1.117 1.825c.278.774.31 1.478.273 2.015a6 6 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931c.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843c-1.232.797-2.539 1.242-3.012 1.39a1.7 1.7 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491c-.658.329-1.51.19-2.122-.134a1.08 1.08 0 0 1-.58-1.153a1.2 1.2 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946c.056-.723.556-1.367.88-1.71a5.5 5.5 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737c-.32-.537-.644-1.367-.329-2.21c.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.42 3.42 0 0 1 2.298-1.103q.056-.138.125-.283c.31-.658.639-1.029 1.024-1.168a1 1 0 0 1 .328-.06z" /></svg>;
		case 'react':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.23 12.004a2.236 2.236 0 1 1-4.471 0a2.236 2.236 0 0 1 4.471 0m2.648-10.69c-1.346 0-3.107.96-4.888 2.622c-1.78-1.653-3.542-2.602-4.887-2.602c-.41 0-.783.093-1.106.278c-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03c-.704 3.113-.39 5.588.988 6.38c1.376.8 3.674-.17 5.99-2.349c2.31 2.143 4.6 3.112 5.993 2.328c1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032c.704-3.11.39-5.587-.988-6.38a2.17 2.17 0 0 0-1.092-.278M12 8.1c.74 0 1.477.034 2.202.093a25 25 0 0 1 2.201 3.806a25 25 0 0 1-2.193 3.82a25.6 25.6 0 0 1-4.412.005a27 27 0 0 1-2.201-3.806A25 25 0 0 1 9.79 8.196A25 25 0 0 1 12 8.098" /></svg>;
		case 'vue':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M24 1.61h-9.94L12 5.16L9.94 1.61H0l12 20.78ZM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43Z" /></svg>;
		case 'svelte':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767a4.1 4.1 0 0 1-.703-3.107a4 4 0 0 1 .526-1.843l.287.21a7.2 7.2 0 0 0 2.186 1.092l-.099 1.271a1.25 1.25 0 0 0 .226.83a1.34 1.34 0 0 0 1.778.383l5.59-3.562a1.2 1.2 0 0 0 .313-1.715a1.34 1.34 0 0 0-1.778-.382l-2.133 1.36a4.44 4.44 0 0 1-5.9-1.267a4.1 4.1 0 0 1 1.04-5.69l5.589-3.563a4.44 4.44 0 0 1 5.9 1.268a4.1 4.1 0 0 1 .177 4.151l-.286-.21a7.2 7.2 0 0 0-2.187-1.093l.099-1.27a1.25 1.25 0 0 0-.226-.831a1.34 1.34 0 0 0-1.778-.382L8.62 9.368a1.2 1.2 0 0 0-.313 1.715a1.34 1.34 0 0 0 1.779.382l2.132-1.36a4.44 4.44 0 0 1 5.9 1.267a4.1 4.1 0 0 1-1.04 5.691l-5.589 3.563a4 4 0 0 1-1.135.499" /></svg>;
		case 'webcomponents':
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m11.731 2.225l-.01.016H5.618L0 11.979l5.618 9.736h12.8l2.174-3.675l.518-.893l-.626-.764h.895L24 11.994l-2.621-4.405h-.945l.63-.763l-2.606-4.57l-.03-.03zM9.107 6.824h6.19l-.53.764l2.375 4.015h.875l-.277.328l.357.435h-.956l-2.398 4.015h.027l.523.764H9.074l-2.99-5.168z" /></svg>;
		case 'cli':
		default:
			return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19h8M4 17l6-6l-6-6" /></svg>;
	}
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
	return (
		<label className="toggle">
			<span>{label}</span>
			<input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
			<i aria-hidden="true" />
		</label>
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

function buildCode(kind: CodeTab, o: CodeOpts) {
	const props = `value="${o.value}" style="${o.style}" theme="${o.theme}" variant="${o.variant}"`;
	switch (kind) {
		case 'vue':
			return `<script setup>\nimport { Avatar } from 'seedface/vue'\n<\/script>\n\n<template>\n  <Avatar ${props} :size="${o.size}" />\n</template>`;
		case 'svelte':
			return `<script>\n  import { Avatar } from 'seedface/svelte'\n<\/script>\n\n<Avatar ${props} size={${o.size}} />`;
		case 'html':
			return `<script type="module">\n  import 'seedface/webcomponent'\n<\/script>\n\n<seedface-avatar ${props} size="${o.size}"></seedface-avatar>`;
		case 'cli':
			return `seedface generate --value "${o.value}" \\\n  --style ${o.style} --theme ${o.theme} \\\n  --variant ${o.variant} --size ${o.size} --out avatar.svg`;
		case 'react':
		default:
			return `import { Avatar } from 'seedface/react'\n\n<Avatar\n  ${props}\n  size={${o.size}} shadow animated\n/>`;
	}
}

function GitHubIcon() {
	return <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path fill="currentColor" d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5c.08-1.25-.27-2.48-1-3.5c.28-1.15.28-2.35 0-3.5c0 0-1 0-3 1.5c-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5c-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" /><path fill="currentColor" d="M9 18c-4.51 2-5-2-7-2" /></g></svg>;
}

function CopyIcon() {
	return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></g></svg>;
}

function ArrowRightIcon() {
	return <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7-7l7 7l-7 7" /></svg>;
}

function ArrowUpRightIcon() {
	return <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M7 7h10v10" /></svg>;
}
