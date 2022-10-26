const path = require('path');
const {babelInclude} = require("customize-cra");
const {ModuleFederationPlugin} = require('webpack').container;
const {DefinePlugin} = require('webpack');
const {version, moduleName, apiVersion} = require('./package.json');

// TODO: this logic should be exposed on @smc/modularity as a js-module (as opposed to current ts version) (10/25/2022, akravets)
const qualifiedModuleName = `${moduleName}-${apiVersion}`;

module.exports = function override(config, env) {
  config.output.uniqueName = qualifiedModuleName;
  config.output.publicPath = 'auto';
  // config.output.path = path.join(__dirname, version);
  config.optimization.minimize = false;

  babelInclude([
    path.resolve('src'),
    // adding packages folder to babel
    path.resolve('../')
  ])(config);

  config.plugins = config.plugins.filter(p => p.constructor.name !== "HtmlWebpackPlugin");

  config.plugins.push(
    new ModuleFederationPlugin({
      name: qualifiedModuleName,
      library: {
        name: qualifiedModuleName,
        type: 'window'
      },
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/index',
        './presenters/Chart': './src/chartRenderer'
      },
      shared: [
        {
          react: {singleton: true},
          'react-dom': {singleton: true},
          '@smc/rendering': {singleton: true}
        },
      ],
    }),
    new DefinePlugin({
      VERSION: version
    })
  );

  return config;
}