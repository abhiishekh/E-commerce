/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'Mi-blue':"#0051A2",
        'Csk-yellow':"#F7D10E",
        'Rcb-red':'#e1260a',
        'Kkr-purple':'#512D6D',
        'Dc-blue':'#0066B3',
        'Shr-orange':'#FF6A00',
        'Pubjab-red':'#E30613',
        'Gt-teal':'#00A9A6',
        'Rr-blue':'#3E6B92',
      },
      
    },
   
  },
  plugins: [],

}