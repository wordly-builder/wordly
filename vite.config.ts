import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

const wasmMiddleware = () => {
	return {
		name: 'wasm-middleware',
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				if (req.url.endsWith('.wasm') || req.url.endsWith('.data')) {
					const wasmPath = path.join(__dirname, 'node_modules/@electric-sql/pglite/dist', path.basename(req.url));
					const wasmFile = fs.readFileSync(wasmPath);
					if (req.url.endsWith('.wasm')) {
						res.setHeader('Content-Type', 'application/wasm');
					} else if (req.url.endsWith('.data')) {
						res.setHeader('Content-Type', 'application/octet-stream');
					}
					res.end(wasmFile);
					return;
				}
				next();
			});
		},
	};
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), wasm(), wasmMiddleware(), topLevelAwait()],
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
