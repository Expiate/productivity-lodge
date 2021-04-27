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
        background: '#212529',

        primary: '#393E46',
        primaryAccent: '#736BF3',

        secondary: '#232931',
        secondaryAccent: '#FF5853',

        tertiary: '#FEBC2C',
        tertiaryAccent: '#FFD986',

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
