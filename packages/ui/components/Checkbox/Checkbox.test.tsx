import { renderFromStories } from "@demo-libs/vitest/helpers";
import { describe } from "vitest";

import * as stories from "./Checkbox.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
