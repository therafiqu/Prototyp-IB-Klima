import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2540",
          deep: "#061828",
        },
        accent: {
          DEFAULT: "#1E88E5",
          bright: "#2196F3",
          dark: "#1565C0",
        },
        surface: "rgb(var(--background) / <alpha-value>)",
        "surface-muted": "rgb(var(--background-muted) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        line: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 18px 50px -24px rgb(10 37 64 / 0.28)",
        "card-dark": "0 18px 50px -24px rgb(0 0 0 / 0.55)",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
