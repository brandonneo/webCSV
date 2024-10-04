import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      "@/*": "./path/to/lib/*",
    },
    // Add any other kit options you need here
  },
};
