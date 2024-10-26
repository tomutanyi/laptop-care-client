/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFF7EB',  
        secondary: '#D1D1D1',
        accent: '#FF6347',   
        background: '#F9F9F9',
        text: '#333333',     
      },
    },
  },
  plugins: [],
}
