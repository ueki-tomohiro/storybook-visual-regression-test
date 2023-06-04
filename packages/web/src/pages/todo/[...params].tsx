import { useGetTodo, useUpdateTodo } from "@demo/api/lib/demo/todo/todo";
import { Meta } from "@demo/ui/components/Meta";
import { toInteger } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { DetailView } from "../../presentation/detail/DetailView";
import { EditView } from "../../presentation/edit/EditView";

export default function Detail() {
  const router = useRouter();
  const params = (router.query.params as string[]) || [""];
  const todoId = toInteger(params[0]);
  const { data: todo } = useGetTodo(todoId);
  const { mutate: updateTodo, data, isLoading: isUpdateLoading } = useUpdateTodo();

  useEffect(() => {
    if (!data) return;
    router.replace(`/todo/${data.todo_id}`);
  }, [data, router]);

  if (params.length === 2 && params[1] === "edit" && todo) {
    return (
      <Meta pageTitle={`Edit-${todo?.todo_id}`}>
        <EditView todo={todo} isLoading={isUpdateLoading} updateTodo={(data) => updateTodo({ todoId, data })} />
      </Meta>
    );
  }

  return (
    <Meta pageTitle={`Detail-${todo?.todo_id}`}>
      <DetailView todo={todo} />
    </Meta>
  );
}
