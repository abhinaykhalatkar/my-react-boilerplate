// tailwind.config.js
let brand = {
  light: "#E7D4C6", // For buttons/accents
  faint: "#F9F4F0", // For subtle backgrounds
  dark: "#364349", // For darker accents
};
let bg = {
  light: "#ffffff", // Default light background
  subtle: "#F9F4F0", // Section dividers, muted areas
  dark: "#1F2A30", // Dark mode background (softer than pure black)
  muted: "#293841", // Secondary dark sections
};
let text = {
  main: "#C9A48F",
  light: "#29332E", // Main text on light backgrounds
  muted: "#6B7280", // Secondary text on light backgrounds
  dark: "#F3F4F6", // Main text on dark backgrounds
  darkMuted: "#94A3B8", // Secondary text on dark backgrounds
};
let accent = {
  brown: "#CBB6A6", // Decorative accent color
  borderLight: "#E5E7EB", // Border on light surfaces
  borderDark: "#475569", // Border on dark surfaces
};
let fontSize = {
  smallest: "0.8rem",
  smaller: "0.9rem",
  small: "1rem",
  regular: "1.1rem",
  large: "1.2rem",
  larger: "1.3rem",
  largerPlus: "1.4rem",
  largest: "1.5rem",
};
let fontWeight = {
  reguler: 400,
  medium: 600,
  bold: 800,
};

const extend = {
  colors: {
    brand,
    bg,
    text,
    accent,
    primaryColor: brand.light,
    secondaryColor: brand.dark,
    white: "#ffffff",
    black: "#29332E",
    gray: "#F2F2F2",
    graysecond: "#808080",
        borderLight: brand.primary,
    borderDark: brand.secondary,
    borderRadius: "5px",
    mobile: "480px",
    miniTab: "768px",
    tablet: "992px",
    desktop: "1280px",
    large: "1366px",
  },
  fontSize: fontSize,
  fontFamily: {
    // Use 'Playfair Display' for headings
    heading: ['"Playfair Display"', "serif"],
    // Use 'Montserrat' for body text
    body: ['"Montserrat"', "sans-serif"],
  },
  "max-width": "1400px",
  fontWeight: fontWeight,
};

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx,css,scss}", "./public/index.html"],
  theme: {
    extend, // Merge our centralized tokens into the theme
  },
  plugins: [],
};
