import { Todo } from "@demo/api/lib/demo/model";
import { LinkButton } from "@demo/ui/components/LinkButton";
import dayjs from "dayjs";
import React from "react";

export type DetailViewProps = {
  todo?: Todo;
};

export const DetailView: React.FC<DetailViewProps> = ({ todo }) => {
  if (!todo) return null;

  return (
    <>
      <div className="mb-4 flex items-center gap-2">
        <div className="text-xl">{todo.description}</div>
        <div className="text-tertiary text-xs">{dayjs(todo.end_date).format("YYYY-MM-DD HH:mm:ss")}</div>
      </div>
      <div className="mb-4 flex items-center">
        {todo.completed ? (
          <>
            <span className="material-symbols-outlined">done</span>完了済み
          </>
        ) : (
          <>
            <span className="material-symbols-outlined">label_important</span>未完了
          </>
        )}
      </div>
      <LinkButton href={`/todo/${todo.todo_id}/edit`} variant="secondary">
        編集
      </LinkButton>
    </>
  );
};
