/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "dashboard_bg": "url('/assets/images/bg dashboard.webp')",
      },
      colors: {
        // "dark-mode-layout",
        "dashboard-primary-bg": "#111316",
        "dashboard-secondary-bg": "#181A1D",
        "menu-choose": "#00DF99",
        "menu-choose-fade": "rgba(0, 223, 153, 0.7)",
      },
      boxShadow: {
        "menu-hover": "0 0 10px 2px #00DF99",
        "neon": "0 0 5px 0.5px #ffffff",
        "chara-image": "0 0 8px 0 #ffffff",
        "chara-image-choosed": "0 0 10px 2px #ffffff",
        "button": "0 0 5px 0 #ffffff",
        "button-hover": "0 0 8px 2px #ffffff",
      }
    },
  },
  plugins: [],
};
