const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  publicPath: '',

  pluginOptions: {
    cordovaPath: 'src-cordova'
  }
})
