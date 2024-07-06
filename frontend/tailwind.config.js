/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      screens: {
        custom: { min: '1024px', max: '1297px' },
        laptop: '1024px',
      },
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
        'custom-user-info': '0px 2px 6px rgba(50, 196, 47, 0.25)',
        'custom-dark-modal': '4px 4px 8px rgba(118, 110, 110, 0.25)',
      },
      fontSize: {
        xxs: ['10px', '12.6px'],
        xs: ['12px', '16.8px'],
        sm: ['14px', '17.6px'],
        md: ['16px', '22.4px'],
        lg: ['18px', '40px'],
        xl: ['20px', 'auto'],
        '2xl': ['24px', '18px'],
        '3xl': ['32px', '24px'],
        '4xl': ['32px', '40px'],
      },
      colors: {
        'white-transparent-70': 'rgba(255, 255, 255, 0.7)',
        'main-dark': '#0C0C0C',
        'selected-dark': '#1D1D1D',
        'shadow-footer': '#171717',
        'main-white': '#FFFFFF',
        'dark-grey': '#262525',
        grey: '#8D8D8D',
        'light-grey': '#A8A8A8',
        disabled: '#C6C6C6',
        main: '#D9C01B',
        'secondary-yellow': '#FFDE00',
        'selected-yellow': '#F4F2EC',
        blue: '#0F62FE',
        peach: '#FD8080',
        orange: '#D75810',
        'error-red': '#F40A0A',
        green: '#32C42F',
        purple: '#8A3FFC',
      },
      keyframes: {
        openModalMessage: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        openForms: {
          '0%': {
            opacity: '0',
            transform: 'translate(-50%, -50%) scale(.5)',
          },
          '100%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
      animation: {
        'open-info-modal': 'openModalMessage 0.3s ease-in-out',
        'open-forms-modal': 'openForms 0.3s ease-in-out',
      },
    },
  },
  plugins: [],
};
