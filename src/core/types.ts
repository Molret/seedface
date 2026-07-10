export type AvatarStyle = 'character' | 'shape' | 'gradient' | 'rings' | 'pixel';
export type AvatarVariant = 'light' | 'dark';
export type Radius = number | 'full' | 'none';

export interface AvatarOptions {
	/** Deterministic seed. Same value → same avatar, forever. */
	value: string;
	/** Visual style. @default 'character' */
	style?: AvatarStyle;
	/** Output size in pixels (square). @default 64 */
	size?: number;
	/** Corner radius. `'full'` = circle, `'none'` = square, number = px. @default 'full' */
	radius?: Radius;
	/** Theme id (see `listThemes()`). @default 'default' */
	theme?: string;
	/** Color variant. Dark mode adapts the palette. @default 'light' */
	variant?: AvatarVariant;
	/** Override the background color (any CSS color). */
	background?: string;
	/** Override the foreground color (any CSS color). */
	color?: string;
	/** Force the displayed initials (otherwise derived from `value`). */
	displayValue?: string;
	/** Draw a border. @default false */
	border?: boolean;
	/** Border width in px. @default 2 */
	borderSize?: number;
	/** Border color. @default adapts to variant */
	borderColor?: string;
	/** Soft drop shadow. @default false */
	shadow?: boolean;
	/** Subtle load + hover animation (CSS, disabled under reduced-motion). @default false */
	animated?: boolean;
	/** Extra entropy mixed into the seed. */
	salt?: string | number;
	/** Accessible label. @default derived from value */
	title?: string;
}

export interface AvatarData {
	value: string;
	style: AvatarStyle;
	theme: string;
	variant: AvatarVariant;
	size: number;
	background: string;
	color: string;
	initials: string;
	shapeIndex: number;
	shapeCount: number;
	svg: string;
}
