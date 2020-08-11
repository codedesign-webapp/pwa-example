module.exports = {
  pwa: {
    // 서비스워커를 코드로 수정하기 위해 InjectManifest 모드 사용
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  },
  devServer: {
    disableHostCheck: true
  }
}