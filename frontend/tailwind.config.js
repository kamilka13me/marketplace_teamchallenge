/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      theme: {
        colors: {
          primary: 'rgba(217, 192, 27, 1)',
          darkest: 'rgba(30, 30, 30, 1)',
          text: 'rgba(0, 0, 0, 1)',
          background: '#FFFFFF'
        },
      },
    },
  },
  plugins: [],
};
