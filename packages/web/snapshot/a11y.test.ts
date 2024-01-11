import { test } from "@playwright/test";
import { checkA11y, injectAxe } from "axe-playwright";
import { readFileSync } from "fs";
import { resolve } from "path";
import { Page } from "playwright-core";

const storybookDir = resolve(__dirname, "..", "build");
const data: any = JSON.parse(readFileSync(resolve(storybookDir, "stories.json")).toString());
const items = Object.values(data.stories);

test.describe.configure({ mode: "parallel" });

test.describe("a11y test (user)", () => {
  items.forEach(async (story: any) => {
    test(`${story.title}: ${story.name}`, async ({ page }) => {
      await page.goto(`http://127.0.0.1:3001/iframe.html?id=${story.id}&viewMode=story`, { waitUntil: "networkidle" });
      await injectAxe(page as Page);
      await checkA11y(page as Page, undefined, {
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
