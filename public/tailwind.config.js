/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#3490dc",
        "secondary": "#ffed4a",
        "danger": "#e3342f",
        "gray": "#36393e",
        "light-green": "#18d9a2",
        "purple1": '#A78BFC',
      },

      borderColor: {
        "primary": "#3490dc",
        "secondary": "#ffed4a",
        "danger": "#e3342f",
        "gray": "#36393e",
        "light-green": "#18d9a2",
        "purple1": '#A78BFC',
      },
    },
  },
  plugins: [],
}

