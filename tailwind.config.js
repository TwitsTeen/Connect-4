/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#F3F4F6",
          secondary: "#E5E7EB",
          tertiary: "#D1D5DB",
          text: "#111827",
        },
        dark: {
          primary: "#1F2937",
          secondary: "#374151",
          tertiary: "#4B5563",
          text: "#F3F4F6",
        },
      },
    },
  },
  plugins: [],
};
