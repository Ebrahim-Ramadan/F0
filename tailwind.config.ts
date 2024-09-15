import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
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
          50:  '#000000', 
          100: '#121212', 
          200: '#1A1A1A',
          300: '#333333',
          400: '#4D4D4D',
          500: '#666666', 
          600: '#808080', 
          700: '#999999',
          800: '#B3B3B3',
          900: '#CCCCCC',
          950: '#E6E6E6', 
          
        },        
      },
    },
  },
  plugins: [],
};
export default config;
