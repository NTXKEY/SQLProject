/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      keyframes: {
        appear: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "appear-linear": "appear 1s linear",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        "mirror-surface": "hsla(189, 100% ,85% , 0.15)",
        "water-reflection": "hsla(195, 100% ,95% , 0.22)",
        "aqua-edge": "hsla(183, 100% ,90% , 0.18)",
      },
      backgroundImage: {
        "natural-mirror":
          "linear-gradient(to bottom right,var(--tw-gradient-from) 0%, var(--tw-gradient-via) 50%,var(--tw-gradient-to) 100% )",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
      },
    },
    colors: {
      "light-primary": "#7E1946",
      "dark-primary": "#325495",
      "dark-primary1": "#8a2f58",
      "deep-dark": "#09090b",
      "dark-bg-alt": "#1b1c20",
      "black-c": "#000000",
      "white-bg": "#FFFFFF",
      "light-neutral": "#eff1f3",
      "dark-bg": "#141519",
      "mic-fill": "#2b80ff",
      "light-transparent": "#64748b",
      "dark-transparent": "#e2e8f0",
      "color-white": "#ffffff",
      "indigo-500": "#6366f1",
      "teal-400": "#2dd4bf",
      "purple-600": "#9333ea",
      "Orange-500": "#f97316",
      "Green-500": "#4ade80",
      "Red-500": "#ef4444",
      "light-pink": "#f4f0fc",
      "dark-pink": "#fce7f3",
    },

    screens: {
      s: "300px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1536px",
      arc: "1520px",
    },
  },
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
  darkMode: ["class"],
};
