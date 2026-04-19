/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        anime: {
          primary: "#6C63FF",
          secondary: "#00ADB5",
          accent: "#FFC639",
          dark: "#0F172A",
          soft: "#F8FAFC",
          card: "#FFFFFF",
          muted: "#94A3B8",
        },
      },

      backgroundImage: {
        "anime-gradient": "linear-gradient(135deg, #6C63FF 0%, #00ADB5 100%)",
        "anime-radial": "radial-gradient(circle at top, #6C63FF, #0F172A)",
      },

      boxShadow: {
        anime: "0 10px 25px -5px rgba(108, 99, 255, 0.35)",
        card: "0 8px 20px rgba(0, 0, 0, 0.08)",
        neon: "0 0 25px rgba(217, 70, 239, 0.8)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      animation: {
        fade: "fade 0.4s ease-in-out",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
        pulseGlow: "pulseGlow 2s ease-in-out infinite",
        energyFlow: "energyFlow 4s linear infinite",
      },

      keyframes: {
        fade: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },

        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },

        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },

        // 🔥 Anime Opening Glow Pulse
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.03)",
          },
        },

        // ⚡ Energy flowing gradient (optional upgrade)
        energyFlow: {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "100%": {
            backgroundPosition: "200% 50%",
          },
        },
      },
    },
  },

  plugins: [],
};
