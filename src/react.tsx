import * as React from 'react';
import { generateAvatar } from './core/generate';
import type { AvatarOptions, AvatarData, AvatarStyle, AvatarVariant, Radius } from './core/types';

export interface AvatarProps extends Omit<AvatarOptions, 'style' | 'variant'> {
	style?: AvatarStyle;
	variant?: AvatarVariant | 'auto';
	className?: string;
	/** Extra inline styles merged onto the wrapper element. */
	wrapperStyle?: React.CSSProperties;
}

function resolveVariant(variant: AvatarProps['variant']): AvatarVariant {
	if (variant === 'dark') return 'dark';
	if (variant === 'light') return 'light';
	if (typeof window !== 'undefined' && window.matchMedia) {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return 'light';
}

/**
 * RSC-friendly avatar. The SVG is generated synchronously and rendered as
 * static markup, so it works in Server Components with zero client JS.
 */
export function Avatar(props: AvatarProps) {
	const { className, wrapperStyle, variant, ...options } = props;
	const resolved = resolveVariant(variant);
	const data = generateAvatar({ ...options, variant: resolved });
	return React.createElement('span', {
		className: className ? `seedface-wrapper ${className}` : 'seedface-wrapper',
		style: { display: 'inline-block', lineHeight: 0, ...wrapperStyle },
		dangerouslySetInnerHTML: { __html: data.svg },
	});
}

export function useAvatar(options: AvatarOptions): AvatarData {
	return React.useMemo(() => generateAvatar(options), [
		options.value,
		options.style,
		options.size,
		options.theme,
		options.variant,
		options.radius,
		options.background,
		options.color,
		options.displayValue,
		options.border,
		options.borderSize,
		options.borderColor,
		options.shadow,
		options.animated,
		options.salt,
	]);
}

export type { AvatarData, AvatarStyle, AvatarVariant, Radius };
export { generateAvatar } from './core/generate';
