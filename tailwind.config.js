/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FFFFFF',
        surface: '#F8FAFC',
        cream: '#FAF8F5',
        forest: {
          DEFAULT: '#064E3B',
          dark: '#022C22',
          light: '#0D5F49',
        },
        earth: {
          light: '#A8A29E',
          DEFAULT: '#78716C',
          dark: '#57534E',
        },
        gold: '#D97706',
        stone: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        ink: '#0F172A',
        candi: '#334155',
        moss: '#059669',
        clay: '#047857',
        emerald: {
          fresh: '#10B981',
          deep: '#047857',
        },
        wa: '#16A34A',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        lift: '0 12px 30px -4px rgba(15, 23, 42, 0.08)',
        soft: '0 2px 8px -2px rgba(15, 23, 42, 0.05)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
