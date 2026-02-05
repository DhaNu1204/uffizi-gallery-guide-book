/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      colors: {
        // Renaissance-inspired color palette
        renaissance: {
          gold: '#d4a017',
          'gold-light': '#f4d03f',
          'gold-dark': '#a37a17',
          terracotta: '#c45508',
          'terracotta-light': '#e07020',
          blue: '#1e3a5f',
          'blue-light': '#2c5282',
          burgundy: '#722f37',
          cream: '#faf5e4',
          parchment: '#f5e6c8',
        }
      },
      boxShadow: {
        'inner-lg': 'inset 0 2px 8px 0 rgb(0 0 0 / 0.1)',
        'elegant': '0 4px 14px 0 rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
