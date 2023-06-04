import { useGetTodos } from "@demo/api/lib/demo/todo/todo";
import { Meta } from "@demo/ui/components/Meta";
import React from "react";

import { HomeView } from "../presentation/home/HomeView";

export default function Home() {
  const { data: todos, isLoading } = useGetTodos();

  return (
    <Meta pageTitle="Home">
      <HomeView todos={todos} isLoading={isLoading} />
    </Meta>
  );
}
