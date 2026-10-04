/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          primary: '#FDFBF7',
          secondary: '#8A9A86',
          accent: '#C85A32',
        }
      },
    },
  },
  plugins: [],
};
