import React from "react";

import { Container, ContainerProps } from "./Container";

const defaultArgs: ContainerProps = {
  children: <>Container</>,
};

export default {
  title: "components/Container",
  component: Container,
};

export const Default = { args: defaultArgs };
