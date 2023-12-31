/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#010066",
        secondary: "#ff8531",
        neutral: "#141414",
      },
    },
  },
  plugins: [],
};
