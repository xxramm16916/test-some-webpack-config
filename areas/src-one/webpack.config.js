// Core
const { resolve } = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// Constants
const SRC_GENERAL = resolve(__dirname, '../../src-general')
const SRC_ONE = resolve(__dirname)
const BUILD_DESTINATION = resolve(__dirname, '../../wwwroot')
const AREA_NAME = 'one'

// Config
module.exports = () => {
  return {
    mode: 'development',
    entry: SRC_GENERAL,
    output: {
      path: BUILD_DESTINATION,
      filename: AREA_NAME + '.js'
    },
    resolve: {
      alias: {
        Utilities: resolve(__dirname, 'src/utilities/'),
        Templates: resolve(__dirname, 'src/templates/')
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ['!*.*', AREA_NAME + '.js'],
        verbose: true
      })
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              scss: 'vue-style-loader!css-loader!sass-loader', // <style lang="scss">
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
            }
          }
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader'
        },
      ]
    }
  }
}

