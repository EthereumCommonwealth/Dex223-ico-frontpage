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
        transparent: "transparent",
        current: "currentColor",
        inherit: "inherit",
        // main background colors

        "primary-bg": "#1D1E1E",
        "secondary-bg": "#0F0F0F",
        "tertiary-bg": "#272727",
        "quaternary-bg": "#2E2F2F",

        // core colors

        green: "#7DA491",
        orange: "#AF9A7A",
        yellow: "#ECD245",
        "yellow-light": "#D2BD8B",
        red: "#D24B4B",
        "red-light": "#CD8C8C",
        "red-light-shadow": "#C0A0A0",
        blue: "#7D97A4",
        purple: "#8089BD",

        black: "#000000",
        white: "#FFFFFF",

        // snackbar, badges, warnings colored backgrounds

        "green-bg": "#3C4C4A",
        "red-bg": "#443535",
        "orange-bg": "#4A4237",
        "yellow-bg": "#4C483C",
        "blue-bg": "#2A3A45",
        "purple-bg": "#3C3D4C",

        "erc-20-bg": "#434B4A",
        "erc-223-bg": "#44434B",

        "global-bg": "#0F0F0F",

        // hover colors

        "green-hover": "#A5E7C5",
        "green-bg-hover": "#495C5A",
        "green-hover-icon": "#A5E7E6",
        "red-light-hover": "#F6B4B4",
        "red-hover": "#DA5D57",
        "red-bg-hover": "#655050",
        "purple-hover": "#A5AEE7",
        "purple-bg-hover": "#56586F",
        "purple-hover-icon": "#B8C4FF",
        "blue-hover": "#96B5C4",
        "orange-hover": "#B89158",
        "yellow-bg-hover": "#6C634F",

        "primary-text": "#D1DEDF",
        "secondary-text": "#A2AAA9",
        "tertiary-text": "#798180",

        "erc-20-text": "#97B9B6",
        "erc-223-text": "#949ED4",

        "primary-border": "#575A58",
        "secondary-border": "#383C3A",
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
      36: ["36px", "52px"],
      40: ["40px", "60px"],
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
  plugins: [
    require("@savvywombat/tailwindcss-grid-areas"),
    function ({ addUtilities }) {
      addUtilities({
        '.transform-box-fill': {
          'transform-box': 'fill-box',
        },
        '.transform-box-view': {
          'transform-box': 'view-box',
        },
        '.transform-box-border': {
          'transform-box': 'border-box',
        },
      });
    },
  ],
}

