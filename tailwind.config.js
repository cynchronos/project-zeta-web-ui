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
        "sidebar-chat-bg": "#111316",
        "white-30": "rgba(255, 255, 255, 0.3)",
        "dark-search-bar": "#252A31",
        "dark-contact-button": "#1A1E22",
        "contact-subtitle": "rgba(255, 255, 255, 0.7)",
        "watermark-text": "rgba(255, 255, 255, 0.4)",
        "chat-dialog-container": "#181B1F",
        "bubble-dialog-bg": "#252A31",
        "bubble-dialog-border1": "#2E3137",
        "bubble-dialog-border2": "#07956A",
        "gray-caption-1": "#AEAEAE",
        "gray-input": "#20252B",
        "green-spc-1": "#00C9BD",
        "green-spc-2": "#046F4E",
        "popup-bg": "#202428",
        "transcription-bg": "#181A1D",
        "transcription-title": "#222528",
      },
      backgroundColor: {
        "galaxy-gradient": "linear-gradient(135deg, #7B61FF 0%, #6E5BFF 100%)",
      },
      boxShadow: {
        "menu-hover": "0 0 12px 4px rgba(0, 223, 153, 0.8), 0 0 30px 10px rgba(0, 223, 153, 0.35), 0 0 50px 20px rgba(0, 223, 153, 0.1)",
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
