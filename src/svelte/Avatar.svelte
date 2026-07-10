<script lang="ts">
	import { generateAvatar } from '../core/generate';
	import type { AvatarOptions, AvatarStyle, AvatarVariant, Radius } from '../core/types';

	interface Props {
		value: string;
		style?: AvatarStyle;
		size?: number;
		radius?: Radius;
		theme?: string;
		variant?: AvatarVariant | 'auto';
		background?: string;
		color?: string;
		displayValue?: string;
		border?: boolean;
		borderSize?: number;
		borderColor?: string;
		shadow?: boolean;
		animated?: boolean;
		salt?: string | number;
		title?: string;
		class?: string;
	}

	let {
		value,
		style = 'character',
		size = 64,
		radius = 'full',
		theme = 'default',
		variant = 'auto',
		background,
		color,
		displayValue,
		border = false,
		borderSize = 2,
		borderColor,
		shadow = false,
		animated = false,
		salt,
		title,
		class: className,
	}: Props = $props();

	const resolvedVariant = $derived<AvatarVariant>(
		variant === 'auto'
			? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			: variant,
	);

	const svg = $derived(
		generateAvatar({
			value,
			style,
			size,
			radius,
			theme,
			variant: resolvedVariant,
			background,
			color,
			displayValue,
			border,
			borderSize,
			borderColor,
			shadow,
			animated,
			salt,
			title,
		}).svg,
	);
</script>

<span class="seedface-wrapper {className ?? ''}" style="display:inline-block;line-height:0">
	{@html svg}
</span>
