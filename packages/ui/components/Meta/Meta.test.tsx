import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./Meta.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
