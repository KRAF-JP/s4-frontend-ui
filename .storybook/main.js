const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-next-router',
  ],
  webpackFinal: async (config) => {
    config.resolve.alias = {
      '@components': path.resolve(__dirname, '../src/components/'),
      '@const': path.resolve(__dirname, '../src/const/'),
    }
    return config
  },
  core: {
    builder: 'webpack5',
  },
}
