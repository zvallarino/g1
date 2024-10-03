/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        slideIn: {
          '0%': { width: '0%', left: 'auto', right: '0' },
          '100%': { width: '100%', left: '0', right: 'auto' },
        },
      },
      animation: {
        scaleUp: 'scaleUp 0.3s ease-in-out',
        slideIn: 'slideIn 0.4s ease-in-out forwards',
      },
      colors: {
        'button-bg': '#FF5151',
        'button-hover-text': '#ffffff',
        'button-hover-bg': '#51FF6E',
        'button-text': '#ffffff',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'button': '0px 6px 24px 0px rgba(0, 0, 0, 0.2)',
      },
      letterSpacing: {
        widest: '0.3em',
      },
    },
  },
  plugins: [],
};

