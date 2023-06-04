import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./TodoItem.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
