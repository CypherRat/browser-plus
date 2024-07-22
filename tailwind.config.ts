import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", ...fontFamily.sans],
        "open-sans": ["Open Sans", ...fontFamily.sans],
        "trade-wind": ["Trade Winds", ...fontFamily.sans],
      },
      colors: {
        "primary-bg": "rgb(var(--primary-background) / <alpha-value>)",
        "secondary-bg": "rgb(var(--secondary-background) / <alpha-value>)",
        "primary-text": "rgb(var(--primary-text-color) / <alpha-value>)",
        "secondary-text": "rgb(var(--secondary-text-color) / <alpha-value>)",
        "accent-1": "rgb(var(--accent-1) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
        "accent-3": "rgb(var(--accent-3) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "button-bg": "rgb(var(--button-bg) / <alpha-value>)",
        "button-hover": "rgb(var(--button-bg-hover) / <alpha-value>)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
