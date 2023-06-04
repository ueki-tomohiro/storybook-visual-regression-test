import { composeStories, StoryFile } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import React from "react";

export const renderFromStories = (stories: StoryFile) => {
  const composed = composeStories(stories);
  const testCases = Object.values(composed).map((Story: any) => [Story.storyName, Story, Story.args]);
  test.each(testCases)("renders %s", (_storyName, Component: any, args) => {
    if (_storyName.match(/Fake/)) return;

    const tree = render(<Component {...(args || {})} />);
    expect(tree.baseElement).toMatchSnapshot();
  });
};
