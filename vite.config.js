import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	plugins: [sveltekit(), glsl()],
	server: {
		fs: {
			// Allow access to files from the project root.
			allow: ['..']
		}
	}
});
