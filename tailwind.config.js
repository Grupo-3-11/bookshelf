/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // 👈 importante para funcionar o toggle do dark mode
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }