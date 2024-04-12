import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./Divider.stories";

describe(stories.default.title as string, () => {
  renderFromStories(stories);
});
