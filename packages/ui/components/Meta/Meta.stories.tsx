import React from "react";

import { Meta, MetaProps } from "./Meta";

const defaultArgs: MetaProps = {
  pageTitle: "タイトル",
  children: <>Content</>,
};

export default {
  title: "components/Meta",
  component: Meta,
};

export const Default = { args: defaultArgs };
