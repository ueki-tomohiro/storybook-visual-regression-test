import { Todo } from "@demo/api/lib/demo/model";
import dayjs from "@demo-libs/dayjs";
import Link, { LinkProps } from "next/link";
import React from "react";

export type TodoItemProps = Omit<LinkProps, "href"> & {
  todo: Todo;
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, ...props }) => {
  return (
    <Link {...props} href={`/todo/${todo.todo_id}`} className="w-full">
      <div className="my-2 flex items-center border-2 p-2">
        <div>
          {todo.completed ? (
            <span className="material-symbols-outlined">done</span>
          ) : (
            <span className="material-symbols-outlined">label_important</span>
          )}
        </div>
        <div className="mx-2 text-xl">{todo.description}</div>
        <div className="text-tertiary text-xs">{dayjs(todo.end_date).tz().format("YYYY-MM-DD HH:mm:ss")}</div>
      </div>
    </Link>
  );
};
