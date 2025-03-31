// tailwind.config.js
module.exports = {
  darkMode: 'class', // Enable dark mode via a class on a parent element
  content: [
    "./src/**/*.{js,jsx,ts,tsx,css,scss}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Optionally, move your colors here so you can use them with Tailwind classes
      colors: {
        primary: '#8872ff',
        secondary: '#f6fcfc',
        white: '#ffffff',
        black: '#29332E',
        gray: '#F2F2F2',
        graysecond: '#808080',
      },
      fontSize: {
        smallest: '0.8rem',
        smaller: '0.9rem',
        small: '1rem',
        regular: '1.1rem',
        large: '1.2rem',
        larger: '1.3rem',
        largerPlus: '1.4rem',
        largest: '1.5rem',
      },
      // Similarly, you can add font weights and breakpoints if needed.
    },
  },
  plugins: [],
};
