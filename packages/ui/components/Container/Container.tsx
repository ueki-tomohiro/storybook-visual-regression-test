import React from "react";

export type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-xl px-4 py-0">{children}</div>;
};
