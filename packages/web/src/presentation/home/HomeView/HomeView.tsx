import { Todo } from "@demo/api/lib/demo/model";
import { LinkButton } from "@demo/ui/components/LinkButton";
import React from "react";

import { TodoItem } from "../TodoItem";

export type HomeViewProps = React.PropsWithChildren<{
  todos?: Todo[];
  isLoading?: boolean;
}>;

export const HomeView = ({ isLoading, todos }: HomeViewProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <LinkButton href="/register" variant="primary">
        登録
      </LinkButton>
      <div className="mt-4">
        {todos?.map((todo) => (
          <TodoItem key={todo.todo_id} todo={todo} />
        ))}
      </div>
    </>
  );
};
