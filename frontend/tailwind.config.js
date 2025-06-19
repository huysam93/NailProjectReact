/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-pink': {
          light: '#FFF1F2', // Very light pink for backgrounds
          DEFAULT: '#FBCFE8', // Main pink
          medium: '#F472B6', // A bit darker pink for highlights/hover
          dark: '#DB2777',   // Darker pink for text or active states
        },
      },
      fontFamily: {
        'sans': ['"Inter"', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}