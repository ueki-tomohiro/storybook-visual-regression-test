import { renderFromStories } from "@demo-libs/vitest/helpers";
import { describe } from "vitest";

import * as stories from "./LinkButton.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
