// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Hiragino Kaku Gothic ProN",
          "Hiragino Sans",
          "Yu Gothic",
          "Meiryo",
          "Noto Sans JP",
          "Arial",
          "sans-serif",
        ],
        serif: ["var(--font-instrument-serif)", "Times New Roman", "serif"],
      },
    },
  },
  plugins: [],
};
