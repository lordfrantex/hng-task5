import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: "media",
  theme: {
    extend: {
      colors: {
        custom_blue: "#633CFF",
        custom_light_blue1: "#BEADFF",
        custom_light_blue2: "#EFEBFF",
        custom_dark: "#333333",
        custom_red: "#FF3939",
        custom_light_red: "#EEEEEE",
        custom_offwhite: "#FAFAFA",
        custom_deep_gray: "#737373",
        custom_light_gray: "#D9D9D9",
      },
      boxShadow: {
        'custom-shadow': '0px 0px 32px 0px #633CFF40',
      },
    },
  },

  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
  ],
};

export default config;
