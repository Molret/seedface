import { lighten, mix, relativeLuminance } from './color';

export interface Palette {
	bg: string;
	fg: string;
}

export interface Theme {
	id: string;
	name: string;
	description: string;
	light: Palette[];
	dark: Palette[];
}

function deriveDark(p: Palette): Palette {
	const bg = mix(p.bg, '#0e0e14', 0.82);
	const fg = relativeLuminance(p.fg) > 0.5 ? p.fg : lighten(p.fg, 0.32);
	return { bg, fg };
}

function theme(id: string, name: string, description: string, light: Palette[]): Theme {
	return { id, name, description, light, dark: light.map(deriveDark) };
}

const DEFAULT_LIGHT: Palette[] = [
	{ bg: '#F7F9FC', fg: '#060A23' },
	{ bg: '#EEEDFD', fg: '#4409B9' },
	{ bg: '#FFEBEE', fg: '#BD0F2C' },
	{ bg: '#FDEFE2', fg: '#C56511' },
	{ bg: '#E7F9F3', fg: '#216E55' },
	{ bg: '#EDEEFD', fg: '#05128A' },
	{ bg: '#ECFAFE', fg: '#1F84A3' },
	{ bg: '#F2FFD1', fg: '#526E0C' },
	{ bg: '#FFF7E0', fg: '#935F10' },
	{ bg: '#FDF1F7', fg: '#973562' },
	{ bg: '#EAEFE6', fg: '#69785E' },
	{ bg: '#E0E6EB', fg: '#2D3A46' },
	{ bg: '#E4E2F3', fg: '#280F6D' },
	{ bg: '#E6DFEC', fg: '#37364F' },
	{ bg: '#E2F4E8', fg: '#363548' },
	{ bg: '#E6EBEF', fg: '#4D176E' },
	{ bg: '#EBE6EF', fg: '#AB133E' },
	{ bg: '#E8DEF6', fg: '#420790' },
	{ bg: '#D8E8F3', fg: '#222A54' },
	{ bg: '#ECE1FE', fg: '#192251' },
];

export const THEMES: Theme[] = [
	theme('default', 'Default', 'The original pastel palette, re-tuned for adaptive dark mode.', DEFAULT_LIGHT),
	theme('sunset', 'Sunset', 'Warm peaches, corals and ambers.', [
		{ bg: '#FFEDE6', fg: '#C2410C' },
		{ bg: '#FFF1E6', fg: '#B45309' },
		{ bg: '#FDE8EF', fg: '#BE185D' },
		{ bg: '#FCE7F3', fg: '#9D174D' },
		{ bg: '#FFEDD5', fg: '#EA580C' },
		{ bg: '#FEE2E2', fg: '#B91C1C' },
		{ bg: '#FEF3C7', fg: '#B45309' },
		{ bg: '#FFE4E6', fg: '#9F1239' },
		{ bg: '#FED7AA', fg: '#C2410C' },
		{ bg: '#FFE4F3', fg: '#A21CAF' },
		{ bg: '#FBCFE8', fg: '#831843' },
		{ bg: '#FFE4E6', fg: '#BE123C' },
		{ bg: '#FEE2E2', fg: '#DC2626' },
		{ bg: '#FEF3C7', fg: '#D97706' },
		{ bg: '#FFE8D6', fg: '#9A3412' },
		{ bg: '#FDE2E8', fg: '#BE185D' },
	]),
	theme('ocean', 'Ocean', 'Calm blues, teals and deep navies.', [
		{ bg: '#E0F2FE', fg: '#0369A1' },
		{ bg: '#E0F7FA', fg: '#0E7490' },
		{ bg: '#E8F0FE', fg: '#1D4ED8' },
		{ bg: '#ECFEFF', fg: '#0E7490' },
		{ bg: '#E0F7FA', fg: '#0F766E' },
		{ bg: '#E8EEF9', fg: '#1E3A8A' },
		{ bg: '#DFF5F2', fg: '#0D9488' },
		{ bg: '#E6F0FB', fg: '#1E40AF' },
		{ bg: '#E0F2F1', fg: '#00796B' },
		{ bg: '#EAF2FF', fg: '#1D4ED8' },
		{ bg: '#DEF4F4', fg: '#115E59' },
		{ bg: '#E3F2FD', fg: '#1565C0' },
		{ bg: '#E0F7FA', fg: '#0891B2' },
		{ bg: '#E8EFFB', fg: '#3730A3' },
		{ bg: '#DCEEFB', fg: '#0B5394' },
		{ bg: '#E4F4F9', fg: '#0E7490' },
	]),
	theme('forest', 'Forest', 'Fresh greens and mossy tones.', [
		{ bg: '#E7F9F3', fg: '#047857' },
		{ bg: '#EDF7E9', fg: '#3F6212' },
		{ bg: '#E8F5E9', fg: '#2E7D32' },
		{ bg: '#E6F4EA', fg: '#1B5E20' },
		{ bg: '#F0F7E6', fg: '#4D7C0F' },
		{ bg: '#E7F6EC', fg: '#15803D' },
		{ bg: '#EAF4E4', fg: '#3F6212' },
		{ bg: '#E5F5EC', fg: '#166534' },
		{ bg: '#EDF7E4', fg: '#558B2F' },
		{ bg: '#E9F5E1', fg: '#2E7D32' },
		{ bg: '#E6F4E7', fg: '#1B5E20' },
		{ bg: '#F0F4E2', fg: '#657C1F' },
		{ bg: '#E8F6E9', fg: '#047857' },
		{ bg: '#EBF7E2', fg: '#3E8E41' },
		{ bg: '#E5F3E9', fg: '#2F6B33' },
		{ bg: '#EAF6EF', fg: '#0F766E' },
	]),
	theme('candy', 'Candy', 'Playful pinks and purples.', [
		{ bg: '#FDF1F7', fg: '#9D174D' },
		{ bg: '#F3E8FF', fg: '#6B21A8' },
		{ bg: '#FAE8FF', fg: '#86198F' },
		{ bg: '#FCE7F3', fg: '#9D174D' },
		{ bg: '#F5E1FF', fg: '#7E22CE' },
		{ bg: '#FDE8F3', fg: '#A21CAF' },
		{ bg: '#F8E1FA', fg: '#9333EA' },
		{ bg: '#FCE7F3', fg: '#BE185D' },
		{ bg: '#F3E8FF', fg: '#7C3AED' },
		{ bg: '#FDE8F8', fg: '#C026D3' },
		{ bg: '#FAE8FF', fg: '#A21CAF' },
		{ bg: '#F5E1FB', fg: '#86198F' },
		{ bg: '#FCE7F5', fg: '#9D174D' },
		{ bg: '#F3E8FF', fg: '#6D28D9' },
		{ bg: '#FDE8F3', fg: '#BE185D' },
		{ bg: '#F8E1FA', fg: '#9333EA' },
	]),
	theme('mono', 'Mono', 'Elegant neutral grayscale.', [
		{ bg: '#F5F5F5', fg: '#171717' },
		{ bg: '#EAEAEA', fg: '#262626' },
		{ bg: '#F0F0F0', fg: '#404040' },
		{ bg: '#E5E5E5', fg: '#171717' },
		{ bg: '#FAFAFA', fg: '#0A0A0A' },
		{ bg: '#EDEDED', fg: '#333333' },
		{ bg: '#F2F2F2', fg: '#525252' },
		{ bg: '#E8E8E8', fg: '#1F1F1F' },
		{ bg: '#F4F4F4', fg: '#272727' },
		{ bg: '#ECECEC', fg: '#404040' },
		{ bg: '#F1F1F1', fg: '#171717' },
		{ bg: '#E6E6E6', fg: '#2D2D2D' },
		{ bg: '#F3F3F3', fg: '#3F3F3F' },
		{ bg: '#EAEAEA', fg: '#262626' },
		{ bg: '#F0F0F0', fg: '#1C1C1C' },
		{ bg: '#EDEDED', fg: '#383838' },
	]),
	theme('neon', 'Neon', 'Vivid color on near-black, built for dark UIs.', [
		{ bg: '#0B0B14', fg: '#22D3EE' },
		{ bg: '#0B0B14', fg: '#A855F7' },
		{ bg: '#0B0B14', fg: '#F472B6' },
		{ bg: '#0B0B14', fg: '#4ADE80' },
		{ bg: '#0B0B14', fg: '#FACC15' },
		{ bg: '#0B0B14', fg: '#FB7185' },
		{ bg: '#0B0B14', fg: '#38BDF8' },
		{ bg: '#0B0B14', fg: '#C084FC' },
		{ bg: '#0B0B14', fg: '#34D399' },
		{ bg: '#0B0B14', fg: '#FBBF24' },
		{ bg: '#0B0B14', fg: '#E879F9' },
		{ bg: '#0B0B14', fg: '#2DD4BF' },
		{ bg: '#0B0B14', fg: '#60A5FA' },
		{ bg: '#0B0B14', fg: '#F87171' },
		{ bg: '#0B0B14', fg: '#A3E635' },
		{ bg: '#0B0B14', fg: '#F0ABFC' },
	]),
];

export const THEME_MAP: Record<string, Theme> = Object.fromEntries(THEMES.map((t) => [t.id, t]));

export function getTheme(id: string): Theme {
	return THEME_MAP[id] ?? THEME_MAP.default;
}
