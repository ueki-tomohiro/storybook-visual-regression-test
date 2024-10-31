import baseConfig from "@demo-libs/vitest";
import { defineConfig } from "vitest/config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["src/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
