/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Updated to include "src/app"
    "./src/pages/**/*.{js,ts,jsx,tsx}", // If you have a "pages" folder in "src"
    "./src/components/**/*.{js,ts,jsx,tsx}", // If you have components in "src"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
