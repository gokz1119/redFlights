/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'gray': '#a39d9d',
      'booking-green': '#15690c',
      'red-primary': '#C2474F',
      'red-secondary': '#A63C42',
      'red-dark': '#4F1719',
      'bg-primary': '#3B1010',
      'bg-secondary': '#573E46'
    },
    extend: {},
  },
  plugins: [],
};

// https://coolors.co/c2474f-a63c42-8a3034-3b1010