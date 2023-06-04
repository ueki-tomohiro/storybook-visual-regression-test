import React, { ComponentPropsWithoutRef, forwardRef } from "react";

export type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
  label?: string;
  error?: string;
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, type = "text", value, ...props }, ref) => {
    return (
      <>
        <div className="relative w-full">
          <fieldset
            className={`w-full ${label ? "h-12" : "mt-1 h-11"} mb-6 rounded border border-solid ${
              error ? "border-caution" : "border-tertiary"
            } focus-within:border-secondary ${
              error ? "[&_label]:[&:not(:focus-within)]:text-caution" : "[&_label]:[&:not(:focus-within)]:text-tertiary"
            } [&_label]:focus-within:text-secondary`}
          >
            {label && (
              <legend className="min-h-3 ml-2 flex px-0.5">
                <label className={`flex text-xs`}>{label}</label>
              </legend>
            )}
          </fieldset>
        </div>
        {error && <div className="text-caution ml-2 mt-2 text-sm">{error}</div>}
      </>
    );
  }
);
InputField.displayName = "InputField";
