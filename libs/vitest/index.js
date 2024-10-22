import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

function stubAssetImport() {
  return {
    name: "stub-asset-import",
    transform(_code, id) {
      if (/(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/.test(id))
        return {
          code: "export default 'test-file-stub'",
        };
    },
  };
}

/** @type { import('vite').UserConfig } */
export default defineConfig({
  plugins: [react(), tsconfigPaths(), stubAssetImport()],
  test: {
    globalSetup: "@demo-libs/vitest/global-setup.ts",
    root: ".",
    environment: "jsdom",
    setupFiles: ["@demo-libs/vitest/vitest.setup.mts"],
    testTransformMode: {
      ssr: ["**/*"],
    },
    testTimeout: 10000,
    css: { modules: { classNameStrategy: "non-scoped" }, include: /.*/ },
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    reporters: ["default", "hanging-process"],
  },
});
