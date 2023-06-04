import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./RegisterView.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
