/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        fraunces: ["Fraunces-Regular"],
        "fraunces-bold": ["Fraunces-Bold"],
      },
      colors: {
        bg: "#e8edf2",
        text_loading: "#14B8A6",
        text: "#A9A9A9",
        text_grey: "#737373",
      },
    },
  },
  plugins: [],
};
