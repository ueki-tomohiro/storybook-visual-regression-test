import baseConfig from "@demo-libs/vitest";
import { defineConfig } from "vitest/config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["components/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
  },
});
