import { renderFromStoriesTest } from "@demo-libs/vitest/helpers";
import { describe } from "vitest";

import * as stories from "./TodoItem.stories";

describe(stories.default.title, () => {
  renderFromStoriesTest(stories);
});
