import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        negro: '#0f0f0f',         // Fondo base moderno
        purpura: '#9333ea',       // Color principal
        purpuraOscuro: '#6b21a8', // Hover o fondo
        amarillo: '#fde047',      // Acento, CTA
        gris: '#1e1e1e',          // Alternativo para secciones oscuras
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
