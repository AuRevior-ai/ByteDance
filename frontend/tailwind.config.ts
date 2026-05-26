import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#F4F7FB",
        panel: "#FFFFFF",
        panelSoft: "#F7F9FD",
        line: "#DFE7F4",
        ink: "#111827",
        muted: "#6B7280",
        accent: "#7B61FF",
        mint: "#33C481",
        amber: "#F59E0B",
        danger: "#EF4444",
      },
      boxShadow: {
        workstation: "0 18px 45px rgba(111, 124, 161, 0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
