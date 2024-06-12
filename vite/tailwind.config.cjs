/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#646cff",
      },
    },
  },
  plugins: [],
}
