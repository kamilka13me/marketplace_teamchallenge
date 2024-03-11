/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      fontFamily: {
        'ibm-plex-sans': ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        outfit: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'custom-base': '0px 2px 11.300000190734863px 0px rgba(118, 110, 110, 0.25)',
        'custom-hover': '4px 4px 36px 0px #766E6E40',
      },
      dropShadow: {
        'custom-primary': '0px 2px 16px rgba(255, 255, 255, 0.25)',
      },
      fontSize: {
        sm: ['14px', '17.6px'],
        md: ['16px', '22.4px'],
        lg: ['18px', '40px'],
        xl: ['20px', '25.2px'],
        '2xl': ['24px', '18px'],
        '3xl': ['32px', '24px'],
        '4xl': ['32px', '40px'],
      },
      colors: {
        primary: '#D9C01B',
        secondary: '#FFDE00',
        'secondary-200': '#F8DA2C',
        black: '#000000',
        'black-transparent-50': 'rgba(0, 0, 0, 0.5)',
        'green-100': '#42BE65',
        green: '#32C42F',
        gray: '#8D8D8D',
        orange: '#D75810',
        'salmon-100': '#F16644',
        'salmon-200': '#F35735',
        red: '#C13940',
        'red-200': '#DA1E28',
        white: '#FFFFFF',
        'white-200': '#FBFAFA',
        'white-300': '#F4F4F4',
        'white-400': '#C6C6C6',
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
