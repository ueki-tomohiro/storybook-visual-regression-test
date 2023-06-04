import Link, { LinkProps } from "next/link";
import React from "react";

import { backgroundColor, Variant } from "../Button/variant";

export type LinkButtonProps = LinkProps &
  React.PropsWithChildren<{
    variant: Variant;
  }>;

export const LinkButton: React.FC<LinkButtonProps> = ({ variant, children, ...props }) => {
  return (
    <Link {...props} className={`mx-auto max-w-3xl text-white ${backgroundColor[variant]} rounded px-4 py-2`}>
      {children}
    </Link>
  );
};
