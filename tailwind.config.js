/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      red: "#ff0000",
      black: "#000",
      white: "#fff",
      grey: "#F7F7F7",
      secondarygrey: "#898A8B",
      text: "#333333",
      textlight: "#EBEBEB",
      textlight2: "#A4AAB2",
      yellow: "#FBBC09",
      yellowlight: "rgb(251, 188, 9, 0.1)",
      primarycolor: "var(--color-primary)",
      mildcolor: "var(--color-mild)",
      secondarycolor: "var(--color-light)",
      darkcolor: "var(--color-dark)",
    },
    extend: {
      fontFamily: {
        // Default sans font
        sans: ["var(--font-roboto)", "system-ui", "sans-serif"],
        // Individual font utilities
        roboto: ["var(--font-roboto)", "sans-serif"],
        mont: ["var(--font-montserrat)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
