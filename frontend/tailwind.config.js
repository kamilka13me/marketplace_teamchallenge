/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      theme: {
        colors: {
          primary: '#003E6B',
          darkest: '#112A43',
          dark: '#4D5674',
          medium: '#838CAB',
          light: '#D8DDF4',
          lightest: '#F0F4F8',
          'error-dark': '#A61B1C',
          'error-light': '#FFEEEE',
          'warning-dark': '#C99A2D',
          'warning-light': '#FFFAEA',
          'true-dark': '#079A82',
          'true-light': '#F0FCF9',
        },
      },
    },
  },
  plugins: [],
};
