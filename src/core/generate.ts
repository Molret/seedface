import { createRng } from './prng';
import { getTheme } from './themes';
import { SHAPES, SHAPE_COUNT } from './shapes';
import { isValidHex, mix } from './color';
import type { AvatarData, AvatarOptions } from './types';

const cache = new Map<string, AvatarData>();
const S = 100;

function resolveRadius(radius: AvatarOptions['radius'], size: number): number {
	if (radius === 'none') return 0;
	if (radius === 'full' || radius == null) return 50;
	const r = (radius / size) * S;
	return Math.max(0, Math.min(50, r));
}

function getInitials(value: string, displayValue?: string): string {
	const text = (displayValue ?? value ?? '').toString().trim();
	if (!text) return '?';
	if (displayValue) return text.slice(0, 2).toUpperCase();
	const words = text.split(/[\s._@\-+]+/).filter(Boolean);
	if (words.length >= 2) {
		return (words[0][0] + words[1][0]).toUpperCase();
	}
	const letters = text.replace(/[^a-zA-Z0-9]/g, '');
	if (letters.length >= 2) return letters.slice(0, 2).toUpperCase();
	return (letters[0] || '?').toUpperCase();
}

function buildShapePath(d: string, scale: number): string {
	const t = 50 - 16 * scale;
	return `<path d="${d}" transform="translate(${t.toFixed(2)} ${t.toFixed(2)}) scale(${scale.toFixed(4)})" fill="currentColor"/>`;
}

function renderCharacter(initials: string, color: string): string {
	const fs = initials.length >= 2 ? 42 : 52;
	return `<text x="50" y="52" font-family="-apple-system,BlinkMacSystemFont,'Inter','Segoe UI',Roboto,Helvetica,Arial,sans-serif" font-size="${fs}" font-weight="650" fill="${color}" text-anchor="middle" dominant-baseline="central" letter-spacing="-1">${escapeXml(
		initials,
	)}</text>`;
}

function renderShape(d: string, color: string): string {
	const scale = (S * 0.6) / 32;
	return `<g color="${color}">${buildShapePath(d, scale)}</g>`;
}

function renderGradient(bg: string, fg: string, initials: string): string {
	const c1 = mix(bg, fg, 0.28);
	const c2 = mix(bg, '#ffffff', 0.12);
	return `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
		<stop offset="0%" stop-color="${c1}"/>
		<stop offset="100%" stop-color="${c2}"/>
	</linearGradient></defs>
	<rect x="0" y="0" width="100" height="100" fill="url(#g)"/>
	${renderCharacter(initials, mix(fg, '#000000', 0.05))}`;
}

function renderRings(bg: string, fg: string): string {
	const rings: string[] = [];
	const steps = [48, 38, 28, 18, 9];
	steps.forEach((r, i) => {
		rings.push(`<circle cx="50" cy="50" r="${r}" fill="${i % 2 === 0 ? bg : fg}"/>`);
	});
	return `${rings.join('')}<circle cx="50" cy="50" r="3" fill="${fg}"/>`;
}

function renderPixel(rng: ReturnType<typeof createRng>, fg: string): string {
	const cells = 5;
	const pad = 12;
	const span = S - pad * 2;
	const cs = span / cells;
	let out = '';
	for (let y = 0; y < cells; y++) {
		for (let x = 0; x < Math.ceil(cells / 2); x++) {
			if (rng.bool(0.5)) {
				const mx = cells - 1 - x;
				out += `<rect x="${(pad + x * cs).toFixed(2)}" y="${(pad + y * cs).toFixed(2)}" width="${cs.toFixed(2)}" height="${cs.toFixed(2)}" fill="${fg}"/>`;
				if (mx !== x) {
					out += `<rect x="${(pad + mx * cs).toFixed(2)}" y="${(pad + y * cs).toFixed(2)}" width="${cs.toFixed(2)}" height="${cs.toFixed(2)}" fill="${fg}"/>`;
				}
			}
		}
	}
	return out;
}

function escapeXml(s: string): string {
	return s.replace(/[<>&'"]/g, (c) =>
		c === '<' ? '&lt;' : c === '>' ? '&gt;' : c === '&' ? '&amp;' : c === "'" ? '&apos;' : '&quot;',
	);
}

export function generateAvatar(options: AvatarOptions): AvatarData {
	const o = options;
	const size = Math.max(8, Math.min(512, Math.round(o.size ?? 64)));
	const style = o.style ?? 'character';
	const variant = o.variant ?? 'light';
	const theme = getTheme(o.theme ?? 'default');
	const palettes = variant === 'dark' ? theme.dark : theme.light;
	const salt = o.salt == null ? 0 : typeof o.salt === 'number' ? o.salt : hashString(o.salt);
	const rng = createRng(o.value ?? '', salt);

	const pi = rng.int(0, palettes.length - 1);
	const shapeIndex = rng.int(0, SHAPE_COUNT - 1);
	const initials = getInitials(o.value ?? '', o.displayValue);

	const palette = palettes[pi];
	const background = o.background && isValidHex(o.background) ? o.background : palette.bg;
	const color = o.color && isValidHex(o.color) ? o.color : palette.fg;

	const cacheKey = [
		o.value,
		style,
		size,
		o.radius ?? 'full',
		theme.id,
		variant,
		background,
		color,
		o.displayValue ?? '',
		o.border ? 1 : 0,
		o.borderSize ?? 2,
		o.borderColor ?? '',
		o.shadow ? 1 : 0,
		o.animated ? 1 : 0,
		salt,
	].join('|');

	const hit = cache.get(cacheKey);
	if (hit) return hit;

	const rx = resolveRadius(o.radius, size);
	const clipId = `sf${(rng.seed >>> 0).toString(36)}`;
	const borderSize = o.borderSize ?? 2;
	const borderColor =
		o.borderColor ?? (variant === 'dark' ? 'rgba(255,255,255,0.22)' : 'rgba(15,15,25,0.10)');

	let body = '';
	switch (style) {
		case 'shape':
			body = renderShape(SHAPES[shapeIndex], color);
			break;
		case 'gradient':
			body = renderGradient(background, color, initials);
			break;
		case 'rings':
			body = renderRings(background, color);
			break;
		case 'pixel':
			body = renderPixel(rng, color);
			break;
		case 'character':
		default:
			body = renderCharacter(initials, color);
			break;
	}

	const shadowDef = o.shadow
		? `<filter id="sh" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0b0b0f" flood-opacity="0.18"/></filter>`
		: '';

	const borderRect = o.border
		? `<rect x="${borderSize / 2}" y="${borderSize / 2}" width="${S - borderSize}" height="${S - borderSize}" rx="${Math.max(0, rx - borderSize / 2)}" fill="none" stroke="${borderColor}" stroke-width="${borderSize}"/>`
		: '';

	const animStyle = o.animated
		? `<style>
		.sf-root{transform-box:fill-box;transform-origin:center;animation:sf-in .5s cubic-bezier(.2,.8,.2,1) both}
		.sf-spin{transform-box:fill-box;transform-origin:center;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
		.sf-root:hover .sf-spin{transform:scale(1.08) rotate(6deg)}
		@keyframes sf-in{from{opacity:0;transform:scale(.82)}to{opacity:1;transform:scale(1)}}
		@media (prefers-reduced-motion:reduce){.sf-root{animation:none}.sf-spin{transition:none}.sf-root:hover .sf-spin{transform:none}}
	</style>`
		: '';

	const title = o.title ?? `Avatar for ${o.value ?? 'unknown'}`;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${S} ${S}" role="img" aria-label="${escapeXml(title)}" class="seedface${o.animated ? ' seedface-animated' : ''}">
	${animStyle}
	<defs>
		<clipPath id="${clipId}"><rect x="0" y="0" width="${S}" height="${S}" rx="${rx}" ry="${rx}"/></clipPath>
		${shadowDef}
	</defs>
	<g class="sf-root"${o.shadow ? ` filter="url(#sh)"` : ''}>
		<g clip-path="url(#${clipId})">
			<rect x="0" y="0" width="${S}" height="${S}" fill="${background}"/>
			<g class="sf-spin">${body}</g>
			${borderRect}
		</g>
	</g>
</svg>`;

	const data: AvatarData = {
		value: o.value ?? '',
		style,
		theme: theme.id,
		variant,
		size,
		background,
		color,
		initials,
		shapeIndex,
		shapeCount: SHAPE_COUNT,
		svg,
	};
	cache.set(cacheKey, data);
	return data;
}

function hashString(s: string): number {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
	return h >>> 0;
}

export function clearCache(): void {
	cache.clear();
}
