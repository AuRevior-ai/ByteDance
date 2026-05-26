import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0D12",
        panel: "#12161F",
        panelSoft: "#1A202C",
        line: "#2E3544",
        ink: "#F6F7FB",
        muted: "#9BA3B4",
        accent: "#4F8CFF",
        mint: "#21C58B",
        amber: "#F4B84A",
        danger: "#F05D5E",
      },
      boxShadow: {
        workstation: "0 24px 80px rgba(0, 0, 0, 0.38)",
      },
    },
  },
  plugins: [],
};

export default config;

