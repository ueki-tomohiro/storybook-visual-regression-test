import { getGetTodoMock } from "@demo/api/lib/demo/todo/todo.msw";
import { action } from "@storybook/addon-actions";

import { EditView, EditViewProps } from "./EditView";

const defaultArgs: EditViewProps = {
  todo: {
    todo_id: 90856,
    description: "turquoise",
    end_date: "2022-12-29T16:14:31.000Z",
    completed: true,
  },
  updateTodo: action("updateTodo"),
  isLoading: false,
};

export default {
  title: "views/EditView",
  component: EditView,
};

export const Default = { args: defaultArgs };

export const Loading = { args: { ...defaultArgs, isLoading: true } };

export const Fake = {
  args: {
    ...defaultArgs,
    todo: getGetTodoMock(),
  },
};
