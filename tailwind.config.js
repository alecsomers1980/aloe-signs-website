/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aloe-green': '#00E533',
        'green-hover': '#00C72E',
        'green-light': '#F5FFF7',
        'charcoal': '#1A1A1A',
        'dark-grey': '#2A2A2A',
        'medium-grey': '#666666',
        'light-grey': '#B0B0B0',
        'border-grey': '#E5E5E5',
        'bg-grey': '#F5F5F5',
        'off-white': '#FAFAF8',
      },
      fontFamily: {
        sans: ['Manrope', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
