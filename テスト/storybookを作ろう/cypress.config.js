const { defineConfig } = require('cypress');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalStudio: true,
  },
});
