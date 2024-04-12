import clsx from "clsx";
import React from "react";

import * as styles from "./Divider.module.css";

export const TITLE = "" as const;

export type DividerProps = {
  textVariant?: "secondary" | "tertiary" | "quaternary";
  fontSize?: "m" | "xm" | "xxm";
  fontWeight?: "normal" | "bold";
  borderVariant?: "basic" | "weak";
  line?: "solid" | "dotted";
  textAlign?: "left" | "center" | "right";
  children?: React.ReactNode;
  noPadding?: boolean;
  className?: string;
};

export const Divider: React.FC<DividerProps> = ({
  textVariant = "secondary",
  fontSize = "xm",
  fontWeight = "normal",
  borderVariant = "weak",
  line = "solid",
  textAlign = "center",
  noPadding,
  children,
  className,
}) => (
  <>
    {children ? (
      <div
        className={clsx(
          styles.divider,
          textAlign === "left" && styles.left,
          textAlign === "center" && styles.center,
          textAlign === "right" && styles.right,
          noPadding && styles.noPadding,
          className
        )}
      >
        {textAlign !== "left" && (
          <div
            className={clsx(
              borderVariant === "weak" && "border-border_weak",
              borderVariant === "basic" && "border-border_basic",
              line === "solid" && styles.borderSolid,
              line === "dotted" && styles.borderDotted
            )}
          />
        )}

        <div
          className={clsx(
            styles.dividerText,
            textAlign === "left" && "inline-flex flex-row items-center justify-start",
            textAlign === "center" && "text-center",
            textAlign === "right" && "inline-flex flex-row items-center justify-end",
            textVariant === "secondary" && "text-text_secondary",
            textVariant === "tertiary" && "text-text_tertiary",
            textVariant === "quaternary" && "text-text_quaternary",
            fontSize === "m" && "text-m",
            fontSize === "xm" && "text-xm",
            fontSize === "xxm" && "text-xxm",
            fontWeight === "bold" && "font-bold"
          )}
        >
          {children}
        </div>
        {textAlign !== "right" && (
          <div
            className={clsx(
              borderVariant === "weak" && "border-border_weak",
              borderVariant === "basic" && "border-border_basic",
              line === "solid" && styles.borderSolid,
              line === "dotted" && styles.borderDotted
            )}
          />
        )}
      </div>
    ) : (
      <div
        className={clsx(
          styles.divider,
          borderVariant === "weak" && "border-border_weak",
          borderVariant === "basic" && "border-border_basic",
          line === "solid" && styles.borderSolid,
          line === "dotted" && styles.borderDotted,
          noPadding && styles.noPadding,
          className
        )}
      />
    )}
  </>
);
