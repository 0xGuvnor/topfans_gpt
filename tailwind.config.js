const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-open-sans)", ...fontFamily.sans],
        cursive: ["var(--font-shrikhand)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#9ece35",
          secondary: "#98f2e7",
          accent: "#6afcd5",
          neutral: "#242A42",
          "base-100": "#223C4E",
          info: "#7BCBDB",
          success: "#0D5E3B",
          warning: "#FBD746",
          error: "#E04D68",
        },
      },
    ],
  },
};
