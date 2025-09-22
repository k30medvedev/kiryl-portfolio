import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['ui-sans-serif','system-ui','-apple-system','Segoe UI','Roboto','Inter','Noto Sans','Ubuntu','Cantarell','Helvetica Neue','Arial','sans-serif']
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.2)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    },
  },
  plugins: [],
} satisfies Config;
