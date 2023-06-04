/** @type { import('@storybook/react').Preview } */
export const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        w375: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        w1024: {
          name: "PC",
          styles: {
            width: "1024px",
            height: "768px",
          },
        },
        w1440: {
          name: "PC wide",
          styles: {
            width: "1440px",
            height: "900px",
          },
        },
      },
    },
  },
};
