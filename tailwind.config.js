/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary-light':'#5800FF',
        'secondary-light':'#0096FF',
        'success-light':'#72FFFF',

        'primary-dark':'#4700D8',
        'secondary-dark':'#9900F0',
        'success-dark':'#F900BF',

        'error':'#dc2626'
      },
      textColor: {
        'primary-light':'#5800FF',
        'secondary-light':'#0096FF',
        'success-light':'#72FFFF',

        'primary-dark':'#4700D8',
        'secondary-dark':'#9900F0',
        'success-dark':'#F900BF',

        'error':'#dc2626'
      },
      colors: {
        'primary-light':'#5800FF',
        'secondary-light':'#0096FF',
        'success-light':'#72FFFF',

        'primary-dark':'#4700D8',
        'secondary-dark':'#9900F0',
        'success-dark':'#F900BF',

        'error':'#dc2626'
      }
    },
  },
  plugins: [],
}