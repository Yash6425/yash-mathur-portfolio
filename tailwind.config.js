/** @type {import('tailwindcss').Config} */

// Theme-aware colours: each one reads a CSS variable defined in src/index.css,
// so the whole site switches between dark and light mode by changing one class on <html>.
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /** "white" is the main foreground colour: white in dark mode, near-black in light mode. */
        white: v('fg'),
        /** Always pure white (text on gradient buttons, certificate backgrounds). */
        snow: '#ffffff',
        slate: {
          200: v('slate-200'),
          300: v('slate-300'),
          400: v('slate-400'),
          500: v('slate-500'),
          600: v('slate-600'),
        },
        ink: {
          950: v('ink-950'),
          900: v('ink-900'),
          800: v('ink-800'),
          700: v('ink-700'),
        },
        accent: {
          blue: '#4f8cff',
          violet: '#8b5cf6',
          cyan: v('cyan'),
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
      },
      animation: {
        gradient: 'gradient 8s ease infinite',
        'spin-slow': 'spinSlow 10s linear infinite',
      },
    },
  },
  plugins: [],
};
