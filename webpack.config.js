var path = require("path");
module.exports = {
  resolve: {
    extensions: [".js"],
    alias: {
      "@util": path.resolve(__dirname, "./src/lib/util"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@middleware": path.resolve(__dirname, "./src/middleware"),
      "@controller": path.resolve(__dirname, "./src/app/controller"),
      "@model": path.resolve(__dirname, "./src/app/db/models"),
      "@repository": path.resolve(__dirname, "./src/app/repository"),
      "@cron": path.resolve(__dirname, "./src/app/cron"),
      "@constant": path.resolve(__dirname, "./src/constant"),
      "@config": path.resolve(__dirname, "./src/app/db/config"),
    },
  },
};
