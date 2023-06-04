import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./DetailView.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
