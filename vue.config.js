const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/weather-widget-vuecli-web-app/"
      : "/",
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/styles/_mixins.scss";`,
      },
    },
  },
});

