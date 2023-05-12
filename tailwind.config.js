/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"], //default font
        abhaya: ["Abhaya Libre", "serif"],
      },
      backgroundImage: {
        heavyRain: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
