import { action } from "@storybook/addon-actions";

import { RegisterView, RegisterViewProps } from "./RegisterView";

const defaultArgs: RegisterViewProps = {
  regisiterTodo: action("regisiterTodo"),
};

export default {
  title: "views/RegisterView",
  component: RegisterView,
};

export const Default = { args: defaultArgs };

export const Loading = { args: { isLoading: true } };
