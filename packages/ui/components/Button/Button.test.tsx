import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./Button.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
