import "@testing-library/jest-dom/vitest";

import { configure } from "@testing-library/react";
export * from "./helpers";

configure({
  testIdAttribute: "data-testid",
});
