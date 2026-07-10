export type RGB = { r: number; g: number; b: number };

export function parseHex(hex: string): RGB {
	let h = hex.replace('#', '').trim();
	if (h.length === 3) {
		h = h
			.split('')
			.map((c) => c + c)
			.join('');
	}
	const num = parseInt(h, 16);
	return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

export function toHex({ r, g, b }: RGB): string {
	const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
	return `#${c(r)}${c(g)}${c(b)}`;
}

export function mix(a: string, b: string, amount: number): string {
	const ca = parseHex(a);
	const cb = parseHex(b);
	return toHex({
		r: ca.r + (cb.r - ca.r) * amount,
		g: ca.g + (cb.g - ca.g) * amount,
		b: ca.b + (cb.b - ca.b) * amount,
	});
}

export function darken(hex: string, amount: number): string {
	return mix(hex, '#000000', amount);
}

export function lighten(hex: string, amount: number): string {
	return mix(hex, '#ffffff', amount);
}

export function relativeLuminance(hex: string): number {
	const { r, g, b } = parseHex(hex);
	const f = (c: number) => {
		c /= 255;
		return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
	};
	return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function readableOn(hex: string): string {
	return relativeLuminance(hex) > 0.45 ? '#0b0b0f' : '#ffffff';
}

export function isValidHex(hex: string): boolean {
	return /^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex.trim());
}
