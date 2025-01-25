import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#16366d',
        'custom-blue-dark': '#0d1a35',
        'custom-blue-light': '#d2e2ff',
      },
    },
  },
  plugins: [],
});

export default config;
