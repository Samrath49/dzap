/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "JIT",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Theme Colors
        richBlack: "#1c1f22",
        btnBorder: "#963DFF",
        btnHover: "#712dbe",
        cardBg: "#24272c",

        // Card specific colors
        slateBg: "#202231",
        textBg: "#bfbfbf",
        inputBg: "#0f121a",
      },
      screens: {
        mf: "990px",
      },
    },
  },
  plugins: [],
}

