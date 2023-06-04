/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    colors: {
      primary: "var(--green)",
      secondary: "var(--blue)",
      tertiary: "var(--gray)",
      caution: "var(--red)",
      white: "var(--white)",
    },
  },
  extend: {
    animation: {
      rotate: "rotate 1.5s linear infinite",
    },
    keyframes: {
      rotate: {
        from: {
          transform: "rotate(0deg)",
        },
        to: {
          transform: "rotate(360deg)",
        },
      },
    },
  },
  plugins: [],
};
