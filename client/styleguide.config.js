const path = require('path');

module.exports = {
  propsParser: require('react-docgen-typescript').parse,
  require: [
    path.join(__dirname, '../node_modules/semantic-ui-css/semantic.css'),
  ],
  webpackConfig: require('react-scripts/config/webpack.config.js'),
};
