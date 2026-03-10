import type { StorybookConfig } from "@storybook/react-vite";
import baseConfig from "../../../libs/storybook/config/main.ts";

const selectedStories = (process.env.STORYBOOK_ONLY_STORY_FILES || "")
  .split(",")
  .map((file) => file.trim())
  .filter(Boolean)
  .filter((file) => file.startsWith("packages/web/"))
  .map((file) => `../${file.replace(/^packages\/web\//, "")}`);

const config: StorybookConfig = {
  ...baseConfig,
  stories: selectedStories.length > 0 ? selectedStories : ["../src/presentation/**/*.stories.tsx"],
};

export default config;
