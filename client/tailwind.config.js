/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        brand: {
          yellow: '#FFE600',
          pink: '#FF2A85',
          lime: '#CCFF00',
          cyan: '#00D2FF',
          purple: '#8B5CF6',
          orange: '#FF7A00',
          dark: '#121212',
        }
      },
      boxShadow: {
        'brutal': '5px 5px 0px 0px #000000',
        'brutal-lg': '8px 8px 0px 0px #000000',
        'brutal-sm': '3px 3px 0px 0px #000000',
        'brutal-hover': '2px 2px 0px 0px #000000',
      },
      animation: {
        'bounce-slight': 'bounceSlight 2s infinite ease-in-out',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
      },
      keyframes: {
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      }
    },
  },
  plugins: [],
}
