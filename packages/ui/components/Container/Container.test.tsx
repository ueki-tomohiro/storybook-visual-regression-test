import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./Container.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
