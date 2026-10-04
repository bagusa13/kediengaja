/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nature: {
          primary: '#FDFBF7',
          secondary: '#3F4A3C',
          accent: '#9C3D1C',
        },
        paper: '#FDFBF7',
        ink: '#1C1917',
        moss: '#3F4A3C',
        clay: '#9C3D1C',
        sage: '#8A9A86',
        wa: '#0F6B4C',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 10px 28px rgba(28, 25, 23, 0.12)',
      },
    },
  },
  plugins: [],
};
