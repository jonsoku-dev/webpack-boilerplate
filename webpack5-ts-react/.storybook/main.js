module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "core": {
    "builder": "webpack5"
  },
  // https://github.com/pmmmwh/react-refresh-webpack-plugin/issues/176#issuecomment-768238380
  reactOptions: {
    fastRefresh: true,
  },
}
