/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line covers subfolders like /components
  ],
  theme: {
    extend: {
      // Ensure 'sans' or your specific font is defined here if you're using a custom one
    },
  },
  plugins: [],
}