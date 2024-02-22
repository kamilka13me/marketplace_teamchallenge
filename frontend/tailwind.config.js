/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'custom-base': ' 0px 2px 11.300000190734863px 0px rgba(118, 110, 110, 0.25)',
      },
      dropShadow: {
        'custom-primary': '0px 2px 16px rgba(255, 255, 255, 0.25)',
      },
      colors: {
        primary: '#D9C01B',
        secondary: '#FFDE00',
        'secondary-200': '#F8DA2C',
        black: '#000000',
        green: '#32C42F',
        gray: '#8D8D8D',
        orange: '#D75810',
        'salmon-100': '#F16644',
        'salmon-200': '#F35735',
        red: '#C13940',
        white: '#FFFFFF',
        'gray-100': '#FFFFFF77',
        'gray-200': '#FFFFFF1D',
        'gray-300': '#A8A8A8',
        'gray-600': '#FFDE0000',
        'gray-700': '#292929',
        'gray-900': '#1E1E1E',
      },
    },
  },
  plugins: [],
};
