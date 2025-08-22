import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/nibbles/",
  test: {
    globals: true,
    environment: "jsdom",
  },
});
