import { getTodoMSW } from "@demo/api/lib/demo/todo/todo.msw";
import { setupServer } from "msw/node";

export const server = setupServer(...getTodoMSW());
