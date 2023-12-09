/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        h1: "calc(1.375rem + 1.5vw)",
      },
      colors: {
        primary: "#010066",
        secondary: "#ff8531",
        neutral: "#141414",
        shades: {
          100: "#f9f9f9",
          200: "#acbad0",
        },
      },
      screens: {
        xs: "345px",
      },
    },
  },
  plugins: [],
};
