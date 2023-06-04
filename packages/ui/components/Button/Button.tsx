import React from "react";

import { backgroundColor, Variant } from "./variant";

export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> &
  React.PropsWithChildren<{
    variant: Variant;
    isLoading?: boolean;
  }>;

export const Button: React.FC<ButtonProps> = ({ variant, isLoading, disabled, children, ...props }) => {
  return (
    <button
      {...props}
      className={`mx-auto max-w-3xl text-white ${backgroundColor[variant]} disabled:bg-tertiary rounded px-4 py-2`}
      disabled={disabled || isLoading}
    >
      {isLoading ? <span className="material-symbols-outlined animate-rotate">refresh</span> : children}
    </button>
  );
};
