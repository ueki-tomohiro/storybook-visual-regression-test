import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./HomeView.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
