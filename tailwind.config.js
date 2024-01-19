import tailwindAnimation from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'react-logo': 'spin 3s linear infinite',
      }
    },
  },
  plugins: [
    tailwindAnimation,
  ],
}