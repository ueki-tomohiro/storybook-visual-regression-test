import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./LinkButton.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
