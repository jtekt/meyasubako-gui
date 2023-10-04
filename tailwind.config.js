/** @type {import('tailwindcss').Config} */

const jtektTheme = {
  primary: "#c00000",
  secondary: "#f000b8",
  accent: "#1dcdbc",
  neutral: "#333333",
  "base-100": "#ffffff",
  info: "#3abff8",
  success: "#36d399",
  warning: "#fbbd23",
  error: "#f87272",
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{ jtektTheme }],
  },
}
