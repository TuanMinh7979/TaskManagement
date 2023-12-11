/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1200px",
      xl: "1440px",
    },
    extend: {
      colors: {
        myBlue: "#0A32B3",
        myPink: "#BD365D",
      },
      backgroundImage: (theme) => ({
        pattern:
          "url('https://img.freepik.com/premium-vector/abstract-blue-green-gradient-color-effect-background-website-banner-poster-paper-card_120819-307.jpg')",
      }),
    },
  },
  plugins: [],
};
