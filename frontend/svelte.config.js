import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

export default {
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter(),
    // Add any other kit options you need here
  },
};
