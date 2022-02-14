const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'certificate': ['Certificate', ...defaultTheme.fontFamily.sans],
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        '@font-face': {
            fontFamily: 'Certificate',
            fontWheight: '300',
            src: 'url(client/src/assests/fonts/certificate.ttf)'
        }
      })
    }),
  
  ],
}