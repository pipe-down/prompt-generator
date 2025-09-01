/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10a37f',
          hover: '#0d8a6a',
        },
      },
      spacing: {
        'sidebar': '260px',
      },
    },
  },
  plugins: [],
}