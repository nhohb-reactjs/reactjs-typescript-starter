/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

const Dotenv = require('dotenv-webpack');

const APP_DIR = path.resolve(__dirname, '../src');

module.exports = env => {
  const { ENVIRONMENT } = env;
  return merge([
    {
      entry: ['@babel/polyfill', `${APP_DIR}/index.tsx`],

      output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
      },

      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",

      resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
          new TsConfigPathsPlugin()
        ],
      },
      module: {
        rules: [
          // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
          {
            test: /\.tsx?$/,
            loader: "awesome-typescript-loader",
          },
          // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
          {
            enforce: "pre",
            test: /\.js$/, loader: "source-map-loader",
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.(scss|css)$/,
            use: [
              ENVIRONMENT === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
              { loader: 'css-loader', options: { sourceMap: ENVIRONMENT !== 'production' } },
              { loader: 'sass-loader', options: { sourceMap: ENVIRONMENT !== 'production' } },
              {
                loader: 'sass-resources-loader',
                options: {
                  sourceMap: ENVIRONMENT !== 'production',
                  resources: [
                    'src/scss/_variables.scss',
                    'src/scss/_mixins.scss',
                  ],
                },
              },
            ],
          },
          {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/fonts/'
              }
            }]
          },
          {
            test: /\.ico?$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: './'
              }
            }]
          },
        ]
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: './index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.ENVIRONMENT': JSON.stringify(ENVIRONMENT),
        }),
        new CopyWebpackPlugin([{ from: 'src/assets' }]),
        new Dotenv({
          path: ENVIRONMENT ? `.env.${ENVIRONMENT}` : `.env.dev`,
        }),
      ],
    }
  ])
};