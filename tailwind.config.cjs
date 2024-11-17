/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    colors: {
        'black': '#000',
        'white': '#fff',
        'gray': {
            100: '#ffffff',
            200: '#f5f5f5',
            300: '#e8e8e8',
            400: '#d9d9d9',
            500: '#bbbbbb',
            600: '#9a9a9a',
            700: '#6c6c6c',
            800: '#484848',
            900: '#2c2c2c',
            950: '#1a1a1a',
        }
    }
  },
  plugins: [],
}

