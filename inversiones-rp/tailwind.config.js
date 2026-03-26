/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#011D4C",
        primary: "#074AAE",
        steel: "#CFCFD2",
        "btn-blue": "#0A59CC",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}