/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        apec: {
          50: '#f0f6fe',
          100: '#ddecfd',
          200: '#c2dffc',
          300: '#99cbfa',
          400: '#67aef6',
          500: '#3f8ef0',
          600: '#2670e4',
          700: '#1d57d0',
          800: '#1d48a8',
          900: '#1d3f84',
          950: '#0b192c',
        },
        'deep-navy': '#0b192c',
        'navy-card': '#112239',
        'safety-orange': '#f97316',
        'safety-amber': '#f59e0b',
        'emerald-accent': '#10b981',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 4s ease-in-out infinite',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 25, 44, 0.06), 0 2px 6px -1px rgba(11, 25, 44, 0.04)',
        'card': '0 10px 30px -4px rgba(11, 25, 44, 0.08), 0 4px 10px -2px rgba(11, 25, 44, 0.04)',
        'glow-orange': '0 0 20px -3px rgba(249, 115, 22, 0.35)',
        'glow-blue': '0 0 20px -3px rgba(38, 112, 228, 0.35)',
      },
    },
  },
  plugins: [],
};

