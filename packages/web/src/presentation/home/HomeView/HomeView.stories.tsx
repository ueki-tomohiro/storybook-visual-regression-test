import { getGetTodosMock } from "@demo/api/lib/demo/todo/todo.msw";

import { HomeView, HomeViewProps } from "./HomeView";

const defaultArgs: HomeViewProps = {
  todos: [
    {
      todo_id: 63460,
      description: "HTTP",
      end_date: "2022-12-07T12:13:58.000Z",
      completed: false,
    },
    {
      todo_id: 43073,
      description: "parse",
      end_date: "2023-01-21T22:30:27.000Z",
      completed: true,
    },
    {
      todo_id: 49534,
      description: "apud",
      end_date: "2022-07-06T18:01:16.000Z",
      completed: false,
    },
  ],
  isLoading: false,
};

export default {
  title: "views/HomeView",
  component: HomeView,
};

export const Default = { args: defaultArgs };

export const Loading = { args: { isLoading: true } };

export const Fake = {
  args: {
    ...defaultArgs,
    todos: getGetTodosMock(),
  },
};
