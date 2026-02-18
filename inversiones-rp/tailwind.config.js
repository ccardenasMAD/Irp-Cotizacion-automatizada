/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      colors: {
        navy: { DEFAULT: "#011D4C" },
        primary: { DEFAULT: "#074AAE" },
        accent: { DEFAULT: "#0E6BF3" },
        steel: { DEFAULT: "#CFCFD2" },
      },
    },
  },
  plugins: [],
};
