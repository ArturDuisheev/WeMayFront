/** @type {import('tailwindcss').Config} */
const twColors = require("tailwindcss/colors");

const colors = {
  black: twColors.black,
  white: twColors.white,
  transparent: twColors.transparent,
  gray: "#F3F3F3",
  grey: "#333333",
  primary: "#00B956",
  green: "#089449",
  red: "#EB5757",
  blue: "rgba(47, 128, 237, 1)",
  white2: "rgba(255, 255, 255, 1)",
  "almost-black": "rgba(23, 23, 23, 1)",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors,
    extend: {
      borderRadius: {
        circle: "50%",
      },
      padding: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
        100: "100px",
      },
      margin: {
        10: "10px",
        20: "20px",
        30: "30px",
        40: "40px",
        50: "50px",
        60: "60px",
        70: "70px",
        80: "80px",
        90: "90px",
      },
      fontSize: {
        14: "14px",
        16: "16px",
        18: "18px",
      },
      fontFamily: {
        montserrat: "Montserrat",
        mulish: "Mulish",
      },
      screens: {
        blt: { max: "1280px" },
        lt: { max: "1024px" },
        tb: { max: "768px" },
        stb: { max: "540px" },
        bmb: { max: "425px" },
        amb: { max: "375px" },
        smb: { max: "340px" },
      },
    },
  },
  plugins: [],
};
