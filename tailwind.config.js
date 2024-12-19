/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { montserrat: [] },
      spacing: {
        2: "2px",
        4: "4px",
        8: "8px",
        12: "12px",
        16: "16px",
        24: "24px",
        32: "32px",
        40: "40px",
        48: "48px",
        64: "64px",
        80: "80px",
        120: "120px",
        180: "180px",
      },
      colors: {
        backgroundColor: "#093545",
        cardColor: "#092C39",
        inputColor: "#224957",
        primary: "#2BD17E",
        error: "#EB5757",
      },
    },
  },
  plugins: [],
};
