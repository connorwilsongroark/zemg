/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        clickPulse: {
          "0%": { scale: "100%" },
          "50%": { scale: "97%", background: "#C084FC" },
          "100%": { scale: "100%" },
        },
      },
      animation: {},
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
