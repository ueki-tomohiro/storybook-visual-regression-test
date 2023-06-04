import { expect, test } from "@playwright/test";
import { readFileSync } from "fs";
import { resolve } from "path";

const storybookDir = resolve(__dirname, "..", "build");
const data: any = JSON.parse(readFileSync(resolve(storybookDir, "stories.json")).toString());

test.describe.configure({ mode: "parallel" });

const items = Object.values(data.stories);
items.forEach(async (story: any) => {
  test(`snapshot test ${story.title}: ${story.name}`, async ({ page }) => {
    if (story.name.match(/Default/)) {
      await page.goto(`http://localhost:3001/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: "networkidle" });
      const image = await page.screenshot({ fullPage: true });
      expect(image, {}).toMatchSnapshot([story.title, `${story.id}.png`]);
    } else {
      test.skip();
    }
  });
});
