import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $lib: "/src/lib", // Points to the primary lib
      $otherLib: "/src/your-other-lib", // Points to the other library
    },
  },
});
