/*global module*/

module.exports = {
  content: ['./app/**/*.hbs'],
  theme: {
    extend: {
      colors: {
        'national-flag-blue': '#162B49',
        mustard: '#EBAD21',
        bone: '#F8F1E0',
        'bright-red': '#C6202E',
      },
      borderWidth: {
        10: '10px',
        12: '12px',
      },
      margin: {
        22: '5.5rem',
      },
      fontFamily: {
        sans: ['GOTHIC', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
