const path = require('path');
const {babelInclude} = require("customize-cra");
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const {name, version} = require('./package.json');

const packageName = `${name}-${version}`;

module.exports = function override(config, env) {
  config.output.uniqueName = packageName;
  config.optimization.minimize = false;

  babelInclude([
    path.resolve('src'),
    // adding packages folder to babel
    path.resolve('../')
  ])(config);

  config.plugins.push(
    new ModuleFederationPlugin({
      name: packageName,
      shared: {
        react: {singleton: true, eager: true},
        'react-dom': {singleton: true, eager: true},
        '@smc/rendering': {singleton: true, eager: true}
      },
    })
  );

  return config;
}