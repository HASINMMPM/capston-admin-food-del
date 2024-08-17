const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  daisyui: {
    darkTheme: "light",
   },
  theme: {
    
    extend: {
      colors: {
        primary: "#399918", //green
        secondary: "#ECFFE6", //white
        lgpink: "#FFAAAA", //light pnik
        main: "#FF7777", //pink
        danger: "#f44336",
      },
      fontFamily: {
        'heading': ["Prompt", 'sans-serif'],
        'sub-heading':[ "Merriweather", 'serif'],
        'super-sub-font' :["Quicksand", 'sans-serif']

      },
    
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}