import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./EditView.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
