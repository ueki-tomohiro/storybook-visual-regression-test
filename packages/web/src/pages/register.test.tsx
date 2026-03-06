import { getRegisterTodoResponseMock } from "@demo/api/lib/demo/todo/todo.msw";
import { createQueryWrapper } from "@demo-libs/vitest/helpers";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import React from "react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";

import { server } from "../mocks/server";
import Register from "./register";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
      replace: vi.fn(),
    };
  },
}));

describe("Register Todo", () => {
  const mockFn = vi.fn();
  const { queryClient, QueryWrapper } = createQueryWrapper();

  beforeAll(() => server.listen());
  beforeEach(() => {
    server.use(
      http.post("*/todo", async ({ request }) => {
        const post = (await request.json()) as { description?: string };
        mockFn(post.description);
        return HttpResponse.json(getRegisterTodoResponseMock(), { status: 201 });
      })
    );
  });
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  test("Post", async () => {
    const user = userEvent.setup();
    render(<Register />, { wrapper: QueryWrapper });
    const description = await screen.getByTestId("description");
    const text = "テスト登録";

    await user.type(description, text);
    expect(description).toHaveProperty("value", text);

    const endDate = await screen.getByTestId("end-date");
    const endText = "2021-10-10";
    await user.type(endDate, endText);
    expect(endDate).toHaveProperty("value", endText);

    await act(async () => {
      await user.click(screen.getByTestId("register-button"));
    });
    await waitFor(() => expect(mockFn).toHaveBeenCalledWith(text));
  });
});
