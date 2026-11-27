import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			// The route manifest stays on the server: it cost every first visit
			// about 37 bytes per route (src/lib/routage-serveur.test.ts).
			router: { resolution: 'server' }
		})
	],
	// The commit /health serves and judges against main. The deploy workflow
	// builds on GitHub, which sets GITHUB_SHA; a local build says "inconnu".
	define: {
		__COMMIT__: JSON.stringify(process.env.GITHUB_SHA ?? 'inconnu'),
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: { passes: 3 },
		},
	}
});
