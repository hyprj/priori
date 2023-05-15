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
        "heavyRain-dark":
          "radial-gradient( circle 815px at 23.4% -21.8%,  rgba(9,29,85,1) 0.2%, rgba(0,0,0,1) 100.2% );",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
