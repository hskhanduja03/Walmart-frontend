// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'br': '#FFE7D0',
      'dr':'#2B241E',
      'light-dr':"#3A3129",
      "dblue":"#32708B",
    },
    boxShadow:{
      'big-l':'-29px 22px 5px -3px rgba(0,0,0,0.1)',
      'big-r':'29px 22px 5px -3px rgba(0,0,0,0.1)',
      'big-a':'0 29px 52px rgba(0,0,0,0.40), 0 25px 16px rgba(0,0,0,0.20)',
    },
    fontFamily:{
      'poppins':'poopins',
    },
    plugins: [
      require('tailwindcss-animated')
    ],
  },
};
export const plugins = [];
