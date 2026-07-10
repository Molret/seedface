<script setup lang="ts">
import { computed } from 'vue';
import { generateAvatar } from '../core/generate';
import type { AvatarOptions, AvatarStyle, AvatarVariant, Radius } from '../core/types';

const props = withDefaults(
	defineProps<{
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
	}>(),
	{
		style: 'character',
		size: 64,
		radius: 'full',
		theme: 'default',
		variant: 'auto',
		border: false,
		borderSize: 2,
		shadow: false,
		animated: false,
	},
);

const resolvedVariant = computed<AvatarVariant>(() =>
	props.variant === 'auto'
		? typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light'
		: props.variant,
);

const svg = computed(() =>
	generateAvatar({
		value: props.value,
		style: props.style,
		size: props.size,
		radius: props.radius,
		theme: props.theme,
		variant: resolvedVariant.value,
		background: props.background,
		color: props.color,
		displayValue: props.displayValue,
		border: props.border,
		borderSize: props.borderSize,
		borderColor: props.borderColor,
		shadow: props.shadow,
		animated: props.animated,
		salt: props.salt,
		title: props.title,
	}).svg,
);
</script>

<template>
	<span class="seedface-wrapper" :class="props.class" v-html="svg" />
</template>

<style scoped>
.seedface-wrapper {
	display: inline-block;
	line-height: 0;
}
</style>
