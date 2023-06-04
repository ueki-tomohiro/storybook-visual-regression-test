import { action } from "@storybook/addon-actions";
import React from "react";

import { Button, ButtonProps } from "./Button";

const defaultArgs: ButtonProps = {
  variant: "primary",
  children: <>Button</>,
  onClick: action("onClick"),
};

export default {
  title: "components/Button",
  component: Button,
};

export const Default = { args: defaultArgs };
