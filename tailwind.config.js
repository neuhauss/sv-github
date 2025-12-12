/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        suse: {
          dark: '#0C322C',
          base: '#30BA78',
          light: '#9EE5B5',
          accent: '#FE7C3F'
        }
      }
    },
  },
  plugins: [],
}