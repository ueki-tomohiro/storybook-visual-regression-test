import Head from "next/head";
import React from "react";

export type MetaProps = React.PropsWithChildren<{
  pageTitle?: string;
  header?: React.ReactNode;
}>;

export const Meta: React.FC<MetaProps> = ({ pageTitle, header, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle ? `Demo - ${pageTitle}` : "Demo"}</title>
        {header}
      </Head>
      {children}
    </>
  );
};
