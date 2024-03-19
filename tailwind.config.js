/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: "#9576EC",
        green: "#3BD171",
        blue: "#22AEFC",
        red: "#D13B3B",
        orange: "#D38932",
        white: "#FFFFFF",
        placeholder: "#7F7F7F",

        green_hover: "#2DBF61",

        "border-primary": "#5A5A5A",

        "primary-text": "#F7FFE4",
        "secondary-text": "#B2B2B2",

        "primary-bg": "#010101",
        "secondary-bg": "#1D1C1E"
      }
    },
  },
  plugins: [],
}

