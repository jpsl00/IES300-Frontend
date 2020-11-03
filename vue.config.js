module.exports = {
  pwa: {
    name: "Bioveda",
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/main.scss";`,
      },
    },
  },
};
