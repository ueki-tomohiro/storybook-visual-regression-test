import { renderFromStories } from "@demo-libs/jest";

import * as stories from "./InputField.stories";

describe(stories.default.title, () => {
  renderFromStories(stories);
});
