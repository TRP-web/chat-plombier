/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        phone1: "320px",
        phone2: "480px",
        tablet: "768px",
        notebook: "1024px",
        monitor1: "1280px",
        monitor2: "1600px",
        monitor3: "1920px"
      },
      colors: {
        "cyan-light": "#6DDDF4",
        "cyanbg-light": "#66D0E5",
        "cyanbg-dark": "#2F90A4",
        "cyanbg-light2": "#EAF4F6",
        //-----------------------------
        "balckbg": "#1E1E1E",
        //-----------------------------
        "black-shadow": "rgba(0, 0, 0, 0.25)"
      },
      fontSize: {
        
      }
    },
  },
  plugins: [],
}

