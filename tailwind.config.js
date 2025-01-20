/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pionlex-primary-400': '#00DBDE',
        'pionlex-primary-600': '#009B9D',
        'pionlex-secondary-400': '#FC00FF',
        'pionlex-secondary-600': '#9E009F',
        'dark-gray-400': '#2C3E50',
        'dark-gray-600': '#232D37',
        'light-gray-400': '#F8F9FC',
        'light-gray-600': '#8391A2',
      },
      width: {
        'min-95-72': 'min(95%, 72.5rem)',
      }
    },
  },
  darkMode: 'selector', // or 'media' 
  plugins: [],
}

