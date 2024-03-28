const { DEFAULT_SANS_SERIF_FONT } = require('next/dist/shared/lib/constants');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        "1": "1px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        customLarge: '32px',
      },
      colors: {
        customPurple: '#633CFF',
        customPurpleActive: '#BEADFF',
        customLightPurple: '#EFEBFF',
        customDarkGrey: '#333333',
        customGrey: '#737373',
        customBorders: '#D9D9D9',
        customLightGrey: '#FAFAFA',
        customWhite: '#FFFFFF',
        customRed: '#FF3939',
      },
      fontFamily: {
        customBold: ['InstrumentSans-Bold', 'sans-serif'],
        customRegular: ['InstrumentSans-Regular', 'sans-serif'],
        customSemiBold: ['InstrumentSans-SemiBold', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
