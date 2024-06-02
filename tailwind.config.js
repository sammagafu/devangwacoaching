/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        raleway: ['Raleway', 'sans-serif'],
      },
      colors: {
        'devanga-primary': {
          DEFAULT: '#1A4687', // Customize the primary color
        },
        'devanga-secondary': {
          DEFAULT: '#11998C', // Customize the secondary color
        },
        'devanga-alternative': {
          DEFAULT: '#14506A', // Customize the alternative color
        },
        'devanga-yellow': {
          DEFAULT: '#FFC949', // Customize the yellow color
        },
      },
    },
  },
  plugins: [],
}
