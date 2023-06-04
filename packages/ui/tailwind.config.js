const config = require("@demo-libs/tailwind/config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: ["./components/**/*.{js,ts,jsx,tsx,mdx}"],
};
