const path = require('path');
const {babelInclude} = require("customize-cra");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const {DefinePlugin} = require('webpack');
const {name, version, moduleName} = require('./package.json');

const uniqueName = `${moduleName}-${version}`;

module.exports = function override(config, env) {
  config.output.uniqueName = uniqueName;
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
      name: uniqueName,
      library: {
        name: uniqueName,
        type: 'window'
      },
      filename: 'remoteEntry.[hash].js',
      exposes: {
        './index': './src/index'
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