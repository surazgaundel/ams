/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite',
      },
       keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(359deg)' },
        }
      }
    },
  },
  plugins: [],
}