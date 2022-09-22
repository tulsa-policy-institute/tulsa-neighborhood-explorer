module.exports = {
  daisyui: {
    themes: ["corporate"],
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
        sans: ['franklin', 'sans-serif', 'franklin'],
        headings: ['gothic', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
