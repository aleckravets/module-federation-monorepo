const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist', require('./package.json').version),
    },
    port: 3002,
  },
  output: {
    path: path.join(__dirname, 'dist', require('./package.json').version),
    publicPath: 'auto',
  },
  optimization: {
    minimize: false
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
      name: `charting-${require('./package.json').version}`.replaceAll(/[-\\.]/g, '_'),
      filename: 'remoteEntry.js',
      exposes: {
        './index': './src/index',
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
