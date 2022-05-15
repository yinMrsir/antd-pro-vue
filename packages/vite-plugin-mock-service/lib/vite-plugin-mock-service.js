'use strict';
const WebpackMockServicePlugin = require('webpack-mock-service-plugin');

module.exports = vitePluginMockService;

function vitePluginMockService(options) {
    return {
        name: 'testPlugin',
        apply: 'serve',
        buildStart() {
          const mock = WebpackMockServicePlugin.getInstance(options);
          mock.apply();
        }
      }
}