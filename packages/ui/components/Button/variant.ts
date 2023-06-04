const variants = ["primary", "secondary", "tertiary", "caution"] as const;

export type Variant = (typeof variants)[number];

export const textColor = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  caution: "text-caution",
} as const;

export const backgroundColor = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  caution: "bg-caution",
} as const;
