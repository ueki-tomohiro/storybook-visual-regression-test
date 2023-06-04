/* eslint-disable @typescript-eslint/explicit-function-return-type */
/**
 * Generated by orval 🍺
 * Do not edit manually.
 * TodoApi
 * OpenAPI spec version: 1.0.0
 */
import { faker } from "@faker-js/faker";
import { rest } from "msw";

export const getGetTodosMock = () =>
  Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, (_, i) => i + 1).map(() => ({
    todo_id: faker.datatype.number({ min: undefined, max: undefined }),
    description: faker.random.word(),
    end_date: `${faker.date.past().toISOString().split(".")[0]}Z`,
    completed: faker.datatype.boolean(),
  }));

export const getRegisterTodoMock = () => ({
  todo_id: faker.datatype.number({ min: undefined, max: undefined }),
  description: faker.random.word(),
  end_date: `${faker.date.past().toISOString().split(".")[0]}Z`,
  completed: faker.datatype.boolean(),
});

export const getGetTodoMock = () => ({
  todo_id: faker.datatype.number({ min: undefined, max: undefined }),
  description: faker.random.word(),
  end_date: `${faker.date.past().toISOString().split(".")[0]}Z`,
  completed: faker.datatype.boolean(),
});

export const getUpdateTodoMock = () => ({
  todo_id: faker.datatype.number({ min: undefined, max: undefined }),
  description: faker.random.word(),
  end_date: `${faker.date.past().toISOString().split(".")[0]}Z`,
  completed: faker.datatype.boolean(),
});

export const getTodoMSW = () => [
  rest.get("*/todos", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetTodosMock()));
  }),
  rest.post("*/todo", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getRegisterTodoMock()));
  }),
  rest.get("*/todo/:todoId", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getGetTodoMock()));
  }),
  rest.put("*/todo/:todoId", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"), ctx.json(getUpdateTodoMock()));
  }),
  rest.delete("*/todo/:todoId", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200, "Mocked status"));
  }),
];
