import type { StorybookConfig } from "@storybook/react-vite";
import baseConfig from "@demo-libs/storybook/config/main";

const selectedStories = (process.env.STORYBOOK_ONLY_STORY_FILES || "")
  .split(",")
  .map((file) => file.trim())
  .filter(Boolean)
  .filter((file) => file.startsWith("packages/ui/"))
  .map((file) => `../${file.replace(/^packages\/ui\//, "")}`);

const config: StorybookConfig = {
  ...baseConfig,
  stories: selectedStories.length > 0 ? selectedStories : ["../components/**/*.stories.tsx"],
};

export default config;
