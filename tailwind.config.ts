import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        magenta: '#e61e8c', // El magenta exacto del anuncio
      },
    },
  },
  plugins: [],
};
export default config;