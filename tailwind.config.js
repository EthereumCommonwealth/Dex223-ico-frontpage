/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "purple-neon-line-gradient": "linear-gradient(180deg, rgba(149, 118, 236, 0) 0%, #9576EC 50%, rgba(149, 118, 236, 0) 100%)"
      },
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
        "secondary-bg": "#1D1C1E",
        "tertiary-bg": "#141316"
      }
    },
    fontSize: {
      8: ["8px", "12px"],
      10: ["10px", "14px"],
      12: ["12px", "16px"],
      14: ["14px", "20px"],
      16: ["16px", "24px"],
      18: ["18px", "28px"],
      20: ["20px", "32px"],
      24: ["24px", "40px"],
      30: ["30px", "44px"],
      32: ["32px", "48px"],
      58: ["58px", "80px"],
    },
    spacing: {
      "0": "0px",
      "0.5": "2px",
      "1": "4px",
      "1.5": "6px",
      "2": "8px",
      "2.5": "10px",
      "3": "12px",
      "3.5": "14px",
      "4": "16px",
      "5": "20px",
      "5.5": "22px",
      "6": "24px",
      "7": "28px",
      "8": "32px",
      "9": "36px",
      "10": "40px",
      "11": "44px",
      "12": "48px",
    },
    borderRadius: {
      "0": "0px",
      "1": "4px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "20": "80px",
      full: "50%",
    },
  },
  plugins: [],
}

