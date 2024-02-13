/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.html', // Path to your HTML files
    './src/**/*.js',   // Path to your JavaScript files
    './src/**/*.jsx',
  ],
  theme: {
    extend: {
      height: {
        '6/7': '93.333333%',
      }
    },
  },
  plugins: [],
}

