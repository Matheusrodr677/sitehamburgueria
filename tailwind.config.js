/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily:{
      'sans': ['Roboto', 'sans-serif']

    },
    extend: {
      backgroundImg:{
        "home": "url('/imagens/bg.png')"
      }
    },
  },
  plugins: [],
}

