/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],

  theme: {
    extend: {
      colors:{
        highlight:'#ffbe30',
      },
      animation: {
        slowSpin: 'spin 2s linear infinite',
      }
    },
  },
  plugins: [require("daisyui")],
};
