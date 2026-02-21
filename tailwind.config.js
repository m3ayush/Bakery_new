/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8C6239', // Crust
        accent: '#D9C5B2',  // Crumb
        background: '#F9F7F2', // Chaff
        dark: '#341F16',    // Deep Brown Dark text
      },
      fontFamily: {
        heading: ['Fraunces', 'serif'],
        drama: ['"Petit Formal Script"', 'cursive'],
        data: ['Montserrat', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

