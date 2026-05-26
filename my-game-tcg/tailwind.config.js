import {COLORS} from './src/constants/color.constants.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
        black: COLORS.black,
        transparent: COLORS.transparent,
      },
    },
  },
  // Removed custom classes
  plugins: [],
}
