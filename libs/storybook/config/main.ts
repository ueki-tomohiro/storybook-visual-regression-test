import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  core: {
    builder: "@storybook/builder-vite",
  },
  stories: ["**/*.stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-onboarding",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "../"),
        },
      },
      define: {
        "process.env": {},
      },
    });
  },
};
export default config;
