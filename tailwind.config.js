/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0F3B2E',
          green: '#5A8F3D',
          light: '#A7C957',
          orange: '#F59E0B',
          cream: '#F7F4EC',
          neutral: '#F4F5EF',
          ink: '#0F1714',
        },
        paper: '#FFFFFF',
        surface: '#F8F7F3',
        cream: '#F8F7F3',
        forest: {
          DEFAULT: '#0F3B2E',
          dark: '#09271E',
          light: '#1B5E4A',
        },
        earth: {
          light: '#A8A29E',
          DEFAULT: '#78716C',
          dark: '#57534E',
        },
        gold: '#F59E0B',
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
        ink: '#0F1714',
        candi: '#334155',
        moss: '#0F3B2E',
        clay: '#0F3B2E',
        emerald: {
          fresh: '#10B981',
          deep: '#0F3B2E',
        },
        wa: '#16A34A',
      },
      fontFamily: {
        display: ['"Poppins"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Poppins"', '"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        lift: '0 4px 12px -2px rgba(15, 23, 42, 0.06)',
        soft: '0 1px 3px 0 rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        lg: '0.625rem',
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
