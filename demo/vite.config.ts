import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
	root: __dirname,
	base: '/seedface/',
	plugins: [react()],
	resolve: {
		alias: {
			seedface: resolve(__dirname, '../src/react.tsx'),
			'seedface-core': resolve(__dirname, '../src/core/index.ts'),
		},
	},
	build: { outDir: 'dist' },
});
