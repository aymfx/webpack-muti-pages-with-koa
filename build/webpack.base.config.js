const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

const getEntries = require('./util/getEntry');  // 获取入口
const getHtmlTemplate = require('./util/getHtmlTemplate'); // 获取页面列表

const isProd = process.env.NODE_ENV === 'production'; // 是否是生产环境

// 基础路径
const basePath = './';

module.exports = {
  entry: getEntries('./client/skins'),
  output: {
    filename: isProd ? '[name].[hash].js' : '[name].[hash].js',
    path: path.resolve(basePath, 'dist/client/skins/'),
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss|css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader?sourceMap',
          'css-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          'sass-loader?sourceMap',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'url-loader?limit=8192&context=client&name=[path][name].[ext]',
      },
      {
        test: /\.tpl$/,
        use: [
          {
            loader: path.resolve('./build/util/template-loader.js'),
            options: {
              title: '标题'
            }
          }
        ]
      }
  ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(basePath, './client/src'),
      '$': path.resolve(basePath, './build/util')
    }
  },
  plugins: [
    new cleanWebpackPlugin(
      'dist',
      {
        root: path.resolve(basePath),
        // exclude: ['index.html'],
        verbose: true
      }
    ),
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].[hash].css' : '[name].[chunkhash].css',
      chunkFilename: !isProd ? '[id].[hash].css' : '[id].[chunkhash].css',
    }),
    ...getHtmlTemplate('./client/skins')
  ]
};
