module.exports = {
    pwa: {
      workboxOptions: {
         // 프리캐시(pre-cache)할 파일 지정
         include: [/^index\.html$/, /\.css$/, /\.js$/,
 /^manifest\.json$/, /\.png$/],
         // exclude는 반드시 기입해야 정상적으로 동작함.
         exclude: []
      }
    }
}