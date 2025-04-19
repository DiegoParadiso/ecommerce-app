/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ¡esto le dice que busque clases en todos tus componentes!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}