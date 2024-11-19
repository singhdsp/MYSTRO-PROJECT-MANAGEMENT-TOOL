/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#274DB2",
        inactive: "#7E8CA0",
        secondary: "#F0F0F0",
        placeholder: "#333333",
        danger:"#FF574C",
        info:"#48B8F7",
        warning:"#F2D059",
        success:"#3CC372",
      },
    },
  },
  plugins: [],
};
