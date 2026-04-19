import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F4EEE3",
        ink: "#1F1B16",
        mist: "#8AA3A6",
        ochre: "#C9A96E",
        bone: "#E9E1D2",
        whisper: "#7A726A",
        stone: {
          50: "#fafaf9",
          100: "#f5f5f4",
          200: "#e7e5e4",
          300: "#d6d3d1",
          400: "#a8a29e",
          500: "#78716c",
          600: "#57534e",
          700: "#44403c",
          800: "#292524",
          900: "#1c1917",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Iowan Old Style", "Palatino", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
      animation: {
        drift: "drift 38s ease-in-out infinite",
        driftSlow: "drift 64s ease-in-out infinite",
        breathe: "breathe 9s ease-in-out infinite",
        hairline: "hairline 4s ease-in-out infinite",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -1.5%, 0) scale(1.04)" },
        },
        breathe: {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.6" },
        },
        hairline: {
          "0%, 100%": { transform: "scaleY(0.4)", opacity: "0.4" },
          "50%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
