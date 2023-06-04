import { getGetTodoMock } from "@demo/api/lib/demo/todo/todo.msw";

import { DetailView, DetailViewProps } from "./DetailView";

const defaultArgs: DetailViewProps = {
  todo: {
    todo_id: 86624,
    description: "Hybrid",
    end_date: "2022-09-03T15:52:59.000Z",
    completed: true,
  },
};

export default {
  title: "views/DetailView",
  component: DetailView,
};

export const Default = { args: defaultArgs };

export const Loading = { args: { isLoading: true } };

export const Fake = {
  args: {
    ...defaultArgs,
    todo: getGetTodoMock(),
  },
};
