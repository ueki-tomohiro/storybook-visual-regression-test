import { getGetTodosMock } from "@demo/api/lib/demo/todo/todo.msw";
import { createQueryWrapper } from "@demo-libs/vitest/helpers";
import { render, waitFor } from "@testing-library/react";
import { rest } from "msw";
import React from "react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

import { server } from "../mocks/server";
import Home from "./index";

describe("Home", () => {
  const mockFn = vi.fn();
  const { queryClient, QueryWrapper } = createQueryWrapper();

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

  test("List", async () => {
    render(<Home />, { wrapper: QueryWrapper });

    await waitFor(() => expect(mockFn).toHaveBeenCalled());
  });
});
