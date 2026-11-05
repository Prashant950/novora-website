export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121824',
        gold: {
          DEFAULT: '#c5a85c',
          light: '#e0c982',
          dark: '#a0833a',
          50: '#faf7ed',
          100: '#f4ecd3',
          500: '#c5a85c',
          600: '#ab8d43',
        },
        navy: {
          DEFAULT: '#111b2e',
          light: '#1b2944',
          dark: '#0a101d',
        },
        mist: '#f4f6fa',
      },
      fontFamily: {
        display: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
