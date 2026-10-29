import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#1E3A8A',
          purple: '#7C3AED',
          coral: '#F472B6',
        },
        // Gold color palette
        gold: {
          50: '#FFF7E6',
          100: '#FFEDCC',
          200: '#FFDB99',
          300: '#FFC966',
          400: '#FFB733',
          500: '#FFA300',
          600: '#E69500',
          700: '#CC8600',
          800: '#B37700',
          900: '#8A5800',
        },
        // Dark theme colors
        dark: {
          bg: {
            primary: '#111827',
            secondary: '#1F2937',
            tertiary: '#374151',
          },
          text: {
            primary: '#F9FAFB',
            secondary: '#D1D5DB',
            tertiary: '#9CA3AF',
          },
          border: {
            light: '#374151',
            medium: '#4B5563',
            dark: '#6B7280',
          },
        },
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px -2px rgba(212, 165, 50, 0.3)' },
          '100%': { boxShadow: '0 0 20px 2px rgba(212, 165, 50, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-3px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
