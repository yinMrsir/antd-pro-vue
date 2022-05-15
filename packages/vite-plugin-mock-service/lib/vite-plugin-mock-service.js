'use strict';
const WebpackMockServicePlugin = require('webpack-mock-service-plugin');

module.exports = vitePluginMockService;

function vitePluginMockService(options) {
    return {
        name: 'testPlugin',
        apply: 'serve',
        buildStart() {
          const mock = new WebpackMockServicePlugin(options);
          mock.apply();
        }
      }
}