import { getRegisterTodoMock } from "@demo/api/lib/demo/todo/todo.msw";
import { createQueryWrapper } from "@demo-libs/jest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";

import { server } from "../mocks/server";
import Register from "./register";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
      replace: jest.fn(),
    };
  },
}));

describe("Register Todo", () => {
  const mockFn = jest.fn();
  const { queryClient, queryWrapper } = createQueryWrapper();

  beforeAll(() => server.listen());
  beforeEach(() => {
    server.use(
      rest.post("*/todo", async (req, res, ctx) => {
        const post = await req.json();
        mockFn(post.description);
        return res(ctx.json(getRegisterTodoMock()));
      })
    );
  });
  afterEach(() => {
    server.resetHandlers();
    queryClient.clear();
  });
  afterAll(() => server.close());

  it("Post", async () => {
    const user = userEvent.setup();
    render(<Register />, { wrapper: queryWrapper });
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
