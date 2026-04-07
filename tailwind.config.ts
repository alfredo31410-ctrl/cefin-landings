import type { Config } from "tailwindcss";

const config: Config = {
  
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/landings/**/*.{js,ts,jsx,tsx,mdx}", // Agregamos esta por seguridad
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