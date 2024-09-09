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
        'float-move': 'float-move 1s ease-out forwards',
      },
      keyframes: {
        'float-move': {
          '0%': { opacity: '0', transform: 'translate(0, 0) scale(0.5)' },
          '10%': { opacity: '1', transform: 'translate(0, -5px) scale(0.8)' },
          '50%': { opacity: '1', transform: 'translate(10px, -20px) scale(1.2)' },
          '90%': { opacity: '0.5', transform: 'translate(15px, -30px) scale(1)' },
          '100%': { opacity: '0', transform: 'translate(20px, -40px) scale(0.8)' },
        },
      },
      colors: {
        primary: {
          50:  '#000000', // Lightest shade
          100: '#1A1A1A',
          200: '#333333',
          300: '#4D4D4D',
          400: '#666666', // Darkest shade
          500: '#808080', // Main color
          600: '#999999',
          700: '#B3B3B3',
          800: '#CCCCCC',
          900: '#E6E6E6', // Dark shade
          950: '#FFFFFF', // Darkest shade
          // switchPalette: '#474554', // You can adjust this as needed
        },        
      },
    },
  },
  plugins: [],
};
export default config;
