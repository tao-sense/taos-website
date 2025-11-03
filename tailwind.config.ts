import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#d4af37",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeIn1: "fadeIn 2s ease-in-out 1.0s forwards",
        fadeIn2: "fadeIn 2s ease-in-out 2.5s forwards",
        fadeIn3: "fadeIn 2s ease-in-out 4.0s forwards",
        fadeIn4: "fadeIn 2s ease-in-out 5.5s forwards",

        // 👇 New smooth scroll section fade animation
        fadeUp: "fadeUp 1.2s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;