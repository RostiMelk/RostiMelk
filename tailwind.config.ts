import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      fg: "#000086",
      bg: "#D8D7D1",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "2rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    fontFamily: {
      mono: ["JetBrains Mono", "monospace"],
    },
    animation: {
      spin: "spin 5s linear infinite",
      blink: "blink 1s step-end infinite",
      pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      draw: "draw 500ms linear forwards",
    },
    keyframes: {
      spin: {
        to: { transform: "rotate(360deg)" },
      },
      blink: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: "0" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: ".5" },
      },
      draw: {
        to: { strokeDashoffset: "0" },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => ({
            "animation-delay": value,
          }),
        },
        {
          values: theme("transitionDelay"),
        },
      );
    }),
  ],
};
export default config;
