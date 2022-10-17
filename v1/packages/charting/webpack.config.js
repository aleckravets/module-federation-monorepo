const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');
const {name, version} = require('./package.json');

const packageName = `${name}-${version}`;

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist', require('./package.json').version),
    publicPath: 'auto',
    // used for loading chunks, must be unique to avoid conflicts between different versions
    uniqueName: packageName,
    clean: true,
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: packageName,
      library: {
        name: `charting-${version}`,
        type: 'window'
      },
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/index'
      },
      shared: [
        {
          react: { singleton: true },
          'react-dom': { singleton: true },
          '@smc/rendering': {singleton: true}
        },
      ],
    })
  ],
};
