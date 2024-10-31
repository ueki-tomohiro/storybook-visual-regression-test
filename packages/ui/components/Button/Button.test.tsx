import { renderFromStoriesTest } from "@demo-libs/vitest/helpers";
import { describe } from "vitest";

import * as stories from "./Button.stories";

describe(stories.default.title, () => {
  renderFromStoriesTest(stories);
});
