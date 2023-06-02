module.exports = {
  content: [
    "./client/components/**/*.{vue,js,ts}",
    "./client/layouts/*.vue",
    "./client/pages/*.{vue,js}",
    "./app.vue",
    "./client/plugins/*.{js,ts}",
    "./client/pages/**/*.vue"
  ],
  theme: {
    extend: {
        spacing: {
          '20px': '20px',
          '30px': '30px',
          35: '35px',
          40: '40px',
          50: '50px',
          60: '60px',
          70: '70px',
          80: '80px',
        },
        gridTemplateColumns: {
          'auto5fr': 'auto 1fr 1fr 1fr 2fr 1fr',
          'auto4fr': 'auto 1fr 1fr auto 1fr',
          'auto2fr': 'auto 1fr 1fr',
          'auto1fr': 'auto 1fr 1fr',
        }
    },
      screens:{
        'xsm': {'min': '0px', 'max': '640px'},
        // => @media (min-width: 0px and max-width: 640px) { ... }

        'sm': {'min': '640px', 'max': '767px'},
        // => @media (min-width: 640px and max-width: 767px) { ... }

        'md': {'min': '768px', 'max': '1023px'},
        // => @media (min-width: 768px and max-width: 1023px) { ... }

        'lg': {'min': '1024px', 'max': '1279px'},
        // => @media (min-width: 1024px and max-width: 1279px) { ... }

        'xl': {'min': '1280px', 'max': '1535px'},
        // => @media (min-width: 1280px and max-width: 1535px) { ... }

        '2xl': {'min': '1536px'},
        // => @media (min-width: 1536px) { ... }
      }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};