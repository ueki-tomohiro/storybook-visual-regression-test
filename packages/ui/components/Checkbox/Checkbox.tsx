import React, { ComponentPropsWithoutRef, forwardRef } from "react";

export type CheckboxProps = ComponentPropsWithoutRef<"input"> & {
  label: React.ReactNode;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, ...props }, ref) => {
  return (
    <label className="mb-4 flex">
      <div className="mr-2 grow-0">
        <input {...props} type="checkbox" className="accent-primary mr-2 scale-150" ref={ref} />
      </div>
      <div className="grow font-bold">{label}</div>
    </label>
  );
});
Checkbox.displayName = "Checkbox";
