const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {        
        colors: {

        primary: '#1D1D1D',
        secondary: '#292929',
        tertiary: '#FEBC2C',

        textPrimary: '#EEEEEE',
        textSecondary: '#aeaebc',
        textTertiary: '#818294',
        textQuaternary:'#64657A',

      },
      fontFamily: {
        fontx: ['Cooper', 'cooper-black-std'],
        exo: ['Exo', 'Exo-regular']
      }},
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
};
