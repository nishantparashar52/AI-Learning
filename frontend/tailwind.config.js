
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // blue-600
        accent: '#f97316',  // orange-500
        success: '#22c55e', // green-500
        warning: '#f59e0b', // amber-500
      }
    }
  },
  plugins: []
}
