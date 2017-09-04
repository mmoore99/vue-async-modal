import path from 'path'

import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import pkg from '../package.json'

const resolve = (...args) => path.resolve(__dirname, '..', ...args)

const NODE_ENV = process.env.NODE_ENV || 'development'

const isProd = NODE_ENV === 'production'

export default {
  entry: {
    app: resolve('src/index.js'),
    vendors: 'vue'
  },
  output: {
    path: resolve('docs'),
    filename: `[name].[${isProd ? 'chunkhash' : 'hash'}].js`
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        cacheDirectory: true
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: isProd
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: `${pkg.name} - ${pkg.description}`
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors'),
    new webpack.optimize.CommonsChunkPlugin('manifest'),
    ...
      isProd ? [
        new ExtractTextPlugin('[name].[chunkhash].css'),
        new webpack.optimize.ModuleConcatenationPlugin()
      ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.NamedChunksPlugin()
      ]
  ]
}
