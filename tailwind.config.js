/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Adicionando animações personalizadas
      animation: {
        'scale-up': 'scaleUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out',
      },
      keyframes: {
        // Definindo a animação 'scale-up'
        scaleUp: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        // Definindo a animação 'fade-in'
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
