import { useRegisterTodo } from "@demo/api/lib/demo/todo/todo";
import { Meta } from "@demo/ui/components/Meta";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { RegisterView } from "../presentation/register/RegisterView";

export default function Register() {
  const router = useRouter();
  const { mutate: registerTodo, isLoading, data } = useRegisterTodo();

  useEffect(() => {
    if (!data) return;
    router.replace(`/todo/${data.todo_id}`);
  }, [data, router]);

  return (
    <Meta pageTitle="Register">
      <RegisterView isLoading={isLoading} regisiterTodo={(data) => registerTodo({ data })} />
    </Meta>
  );
}
