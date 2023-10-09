/** @type {import('tailwindcss').Config} */

const jtektTheme = {
  primary: "#c00000",
  "primary-content": "white",
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{ jtektTheme }],
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          ...jtektTheme,
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          ...jtektTheme,
        },
      },
    ],
  },
}
