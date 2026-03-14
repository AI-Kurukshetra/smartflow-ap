import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          500: "#0d9488",
          600: "#0f766e",
        },
      },
      borderRadius: {
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
