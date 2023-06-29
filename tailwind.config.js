/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*"],
  theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins', "sans-serif"]
      },
      backgroundImage:{
        "musicbg":"url('/images/bg.jpg')",
      }
    },
  },
  plugins: [],
}

