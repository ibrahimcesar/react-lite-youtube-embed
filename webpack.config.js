const path = require('path');
const webpack = require('webpack');
const PrettierPlugin = require("prettier-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const getPackageJson = require('./scripts/getPackageJson');
const CopyPlugin = require("copy-webpack-plugin");

const {
  version,
  name,
  license,
  repository,
  author,
} = getPackageJson('version', 'name', 'license', 'repository', 'author');

const banner = `
  ${name} v${version}
  ${repository.url}

  Copyright (c) ${author.replace(/ *<[^)]*> */g, " ")} and project contributors.

  This source code is licensed under the ${license} license found in the
  LICENSE file in the root directory of this source tree.
`;

module.exports = {
  mode: "production",
  devtool: 'source-map',
  entry: './src/lib/index.tsx',
  output: {
    filename: 'index.jsx',
    path: path.resolve(__dirname, 'dist'),
    library: "LiteYouTubeEmbed",
    libraryTarget: 'umd',
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: true }),
    ],
  },
  devServer: {
    open: true,
    hot: true,
    host: "localhost",
    static: path.join(__dirname, 'demo'),
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
    ]
  },
  plugins: [
    new PrettierPlugin(),
        new CopyPlugin({
      patterns: [
      {
        from: "./src/lib/LiteYouTubeEmbed.css", to: 'LiteYouTubeEmbed.css'
      },
      {
        from: "./src/lib/bin/postinstall", to: 'bin/postinstall', toType: 'file'
      },
      {
        from: "LICENSE", to: 'LICENSE', toType: 'file'
      },
      ],
    }),
    new webpack.BannerPlugin(banner)
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json', '.tsx', '.jsx']
  }
};