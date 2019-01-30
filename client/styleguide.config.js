const path = require("path");

module.exports = {
  propsParser: require("react-docgen-typescript").parse,
  webpackConfig: require("react-scripts/config/webpack.config.js"),
  require: [
    path.join(__dirname, "../node_modules/semantic-ui-css/semantic.css")
  ]
};
