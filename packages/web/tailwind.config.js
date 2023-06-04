const config = require("@demo-libs/tailwind/config");

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/presentation/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
