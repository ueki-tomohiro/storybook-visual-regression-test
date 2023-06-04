import { getGetTodoMock } from "@demo/api/lib/demo/todo/todo.msw";

import { TodoItem, TodoItemProps } from "./TodoItem";

const defaultArgs: TodoItemProps = {
  todo: { todo_id: 79208, description: "Bedfordshire", end_date: "2022-07-19T12:00:21.000Z", completed: false },
};

export default {
  title: "views/TodoItem",
  component: TodoItem,
};

export const Default = { args: defaultArgs };

export const Fake = {
  args: {
    todo: getGetTodoMock(),
  },
};
