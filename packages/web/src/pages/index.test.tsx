import { getGetTodosMock } from "@demo/api/lib/demo/todo/todo.msw";
import { createQueryWrapper } from "@demo-libs/jest";
import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import React from "react";

import { server } from "../mocks/server";
import Home from "./index";

describe("Home", () => {
  const mockFn = jest.fn();
  const { queryClient, queryWrapper } = createQueryWrapper();

  beforeAll(() => server.listen());
  beforeEach(() => {
    server.use(
      rest.get("*/todos", async (req, res, ctx) => {
        mockFn();
        return res(ctx.json(getGetTodosMock()));
      })
    );
  });
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  it("List", async () => {
    render(<Home />, { wrapper: queryWrapper });

    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
