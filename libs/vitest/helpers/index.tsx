import { composeStories, composeStory } from "@storybook/react";
import type { Args } from "@storybook/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render } from "@testing-library/react";
import dayjs from "dayjs";
import noop from "lodash/noop";
import React, { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const date = dayjs("2020-12-04T10:00:00+09:00").toDate();

export const renderFromStories = (stories: Parameters<typeof composeStories<any>>[0]) => {
  const componentTitle = stories.default.title as string;
  const defaultArgs = (stories.default && stories.default.args) || {};

  describe(componentTitle, () => {
    Object.entries(composeStories(stories)).forEach(([storyName, Story]: [string, any]) => {
      if (storyName === "__esModule") return;
      if (storyName === "default") return;
      if (storyName.match(/Fake/)) return;

      beforeEach(() => {
        vi.setSystemTime(date);
        Object.defineProperty(HTMLMediaElement.prototype, "muted", {
          set: noop,
        });
        const scrollTo = vi.fn();
        vi.spyOn(window, "scrollTo").mockImplementation(scrollTo);
      });
      afterEach(() => {
        vi.useRealTimers();
        cleanup();
      });

      describe(`"${storyName}" story`, () => {
        test("renders without crashing", () => {
          const { container, unmount } = render(<Story {...defaultArgs} {...(Story.args || {})} />);
          expect(container).toMatchSnapshot();
          unmount();
        });
      });
    });
  });
};

export const interactionTestFromStory = <T extends Args>({
  testName,
  story,
  annotations,
  args,
  callback,
}: {
  testName?: string;
  story: Parameters<typeof composeStory<T>>[0];
  annotations: Parameters<typeof composeStory<T>>[1];
  args?: Partial<T>;
  callback: (args: {
    container: HTMLElement;
    rerender: (ui: React.ReactElement) => void;
    Story: ReturnType<typeof composeStory<T>>;
  }) => Promise<void>;
}) => {
  const Story = composeStory<T>(story, { ...annotations, args: { ...annotations.args, ...args } });

  beforeEach(() => {
    vi.setSystemTime(date);
  });
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });

  describe(`"${annotations.title}" story`, () => {
    test(`interaction test ${testName || ""}`, async () => {
      const { container, rerender } = render(<Story {...args} />);
      await callback({ container, rerender, Story });
    });
  });
};

export const createQueryWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  });

  const QueryWrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  return {
    queryClient,
    QueryWrapper,
  };
};
