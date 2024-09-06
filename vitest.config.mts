import baseConfig from "@demo-libs/vitest";
import { defineConfig } from "vitest/config";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["packages/**/*.{test,spec}.?(c|m)[jt]s?(x)"],
    exclude: ["**/snapshot/*"],
  },
});
