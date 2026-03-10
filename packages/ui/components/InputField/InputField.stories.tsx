import { action } from "storybook/actions";
import React from "react";

import { InputField, InputFieldProps } from "./InputField";

const defaultArgs: InputFieldProps = {
  children: <></>,
  onClick: action("onClick"),
};

export default {
  title: "components/InputField",
  component: InputField,
};

export const Default = { args: defaultArgs };
