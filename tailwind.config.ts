import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        rainbow: "rainbow var(--speed, 2s) infinite linear",
        'spin-slow': 'spin 0.2s linear infinite',

        fadeIn: 'fadeIn 0.3s ease-out',
        fadeOut: 'fadeOut 0.3s ease-out',
        'float-move': 'float-move 1s ease-out forwards',
      },
      keyframes: {
        rainbow: {
          "0%": { "background-position": "0%" },
          "100%": { "background-position": "200%" },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'float-move': {
          '0%': { opacity: '0', transform: 'translate(0, 0) scale(0.5)' },
          '10%': { opacity: '1', transform: 'translate(0, -5px) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translate(10px, -20px) scale(1.2)' },
          '90%': { opacity: '0.5', transform: 'translate(15px, -30px) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(20px, -40px) scale(0.8)' },
        },
      },
      colors: {
        "color-1": "hsl(var(--color-1))",
        "color-2": "hsl(var(--color-2))",
        "color-3": "hsl(var(--color-3))",
        "color-4": "hsl(var(--color-4))",
        "color-5": "hsl(var(--color-5))",
        primary: {
          50:  '#000000', // Lightest shade
          100: '#121212', // Lightest shade
          200: '#1A1A1A',
          300: '#333333',
          400: '#4D4D4D',
          500: '#666666', // Darkest shade
          600: '#808080', // Main color
          700: '#999999',
          800: '#B3B3B3',
          900: '#CCCCCC',
          950: '#E6E6E6', // Dark shade
          // switchPalette: '#474554', // You can adjust this as needed
        },        
      },
    },
  },
  plugins: [],
};
export default config;