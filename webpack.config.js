const path = require("path");

module.exports = {
  mode: "development",
  entry: "./foo.js",
  output: {
    filename: "foo.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
