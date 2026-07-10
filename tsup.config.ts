import { defineConfig } from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/core/index.ts',
		react: 'src/react.tsx',
		webcomponent: 'src/webcomponent.ts',
		cli: 'src/cli.ts',
	},
	format: ['esm', 'cjs'],
	dts: true,
	sourcemap: true,
	clean: true,
	minify: false,
	target: 'es2020',
	legacyOutput: false,
	external: ['@resvg/resvg-js', 'sharp'],
	banner: { js: '' },
});
