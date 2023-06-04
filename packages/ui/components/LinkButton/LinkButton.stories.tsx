import React from "react";

import { LinkButton, LinkButtonProps } from "./LinkButton";

const defaultArgs: LinkButtonProps = {
  variant: "primary",
  children: <>Button</>,
  href: "/",
};

export default {
  title: "components/LinkButton",
  component: LinkButton,
};

export const Default = { args: defaultArgs };
