import { test } from "@playwright/test";
import { StoryIndex } from "@storybook/types";
import { checkA11y, injectAxe } from "axe-playwright";
import { readFileSync } from "fs";
import { resolve } from "path";

const storybookDir = resolve(__dirname, "..", "build");
const data: StoryIndex = JSON.parse(readFileSync(resolve(storybookDir, "stories.json")).toString());
const items = Object.values(data.entries);

test.describe.configure({ mode: "parallel" });

test.describe("a11y test (web)", () => {
  items.forEach(async (story) => {
    test(`${story.title}: ${story.name}`, async ({ page }) => {
      await page.goto(`http://127.0.0.1:3001/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: "networkidle" });
      await injectAxe(page);
      await checkA11y(page, undefined, {
        detailedReport: true,
        detailedReportOptions: { html: true },
        axeOptions: {
          runOnly: {
            type: "tag",
            values: ["wcag2a", "wcag21a"],
          },
        },
      });
    });
  });
});
