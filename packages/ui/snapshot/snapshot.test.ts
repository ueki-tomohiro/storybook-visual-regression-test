import { expect, test } from "@playwright/test";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const storybookDir = resolve(__dirname, "..", "build");

// Storybook v8 uses index.json, older versions use stories.json
const indexPath = resolve(storybookDir, "index.json");
const storiesPath = resolve(storybookDir, "stories.json");
const manifestPath = existsSync(indexPath) ? indexPath : storiesPath;
const rawData: any = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath).toString()) : {};
// Storybook v8 uses `entries`, older versions use `stories`
const data = { stories: rawData.stories ?? rawData.entries ?? {} };

test.describe.configure({ mode: "parallel" });

const items = Object.values(data.stories);
items.forEach(async (story: any) => {
  test(`snapshot test ${story.title}: ${story.name}`, async ({ page }) => {
    if (story.name.match(/Default/)) {
      await page.goto(`http://127.0.0.1:4001/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: "networkidle" });
      const image = await page.screenshot({ fullPage: true });
      expect(image, {}).toMatchSnapshot([story.title, `${story.id}.png`]);
    } else {
      test.skip();
    }
  });
});
