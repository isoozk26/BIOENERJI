/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Tema 1: Cosmic Aura Paleti
        aura: {
          bg: '#07080D',
          card: '#0F121C',
          cardHover: '#171B2A',
          border: 'rgba(168, 85, 247, 0.15)',
          purple: '#A855F7',
          violet: '#7C3AED',
          cyan: '#06B6D4',
          amber: '#F59E0B',
        },
        // Tema 2: Holistic Zen & Serene Sanctuary Paleti
        zen: {
          sageDark: '#2E3D34',
          sage: '#5B7564',
          sageLight: '#7E9F89',
          sageSoft: '#A8C2B1',
          linen: '#FBF9F5',
          linenMuted: '#EDE7DC',
          sand: '#D8CFBF',
          sandDark: '#B8AB96',
          stoneDark: '#141A16',
          stoneCard: '#1C231F',
          stoneHover: '#26302A',
          stoneBorder: 'rgba(126, 159, 137, 0.2)',
          clay: '#C27D60',
          amber: '#D4A373'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        zen: ['"Cormorant Garamond"', '"Cinzel"', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'zen-breathe': 'zenBreathe 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        zenBreathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        }
      }
    },
  },
  plugins: [],
}
