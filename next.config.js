const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  webpack: (config, options) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
    return config
  },
}
