import type { StorybookConfig } from "@storybook/react-vite";
import baseConfig from "@demo-libs/storybook/config/main";

const config: StorybookConfig = {
  ...baseConfig,
  stories: ["../components/**/*.stories.tsx"],
};

export default config;
