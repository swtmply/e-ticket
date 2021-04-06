module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        splash: "url('/bg.png')",
      }),
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
      backgroundColor: ["checked", "even"],
      borderColor: ["checked"],
    },
  },
  plugins: [],
};
