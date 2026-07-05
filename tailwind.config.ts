import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        wood: {
          50: "#faf6f0",
          100: "#f3ebe0",
          200: "#e5d5be",
          300: "#d4bc96",
          400: "#c49e6e",
          500: "#b68952",
          600: "#a87647",
          700: "#8c5e3c",
          800: "#724d35",
          900: "#5d402f",
        },
        cream: {
          50: "#fefcf8",
          100: "#fdf8ed",
          200: "#f9efd4",
          300: "#f4e2b0",
          400: "#edd084",
          500: "#e4ba5a",
          600: "#d4a136",
          700: "#b3842b",
          800: "#8f6a28",
          900: "#745826",
        },
      },
    },
  },
  plugins: [],
};

export default config;
