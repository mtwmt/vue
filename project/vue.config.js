// module.exports = {
//   // 去掉文件名中的 hash
//   filenameHashing: false,
//   configureWebpack: {
//     resolve: {
//       extensions: ['.js', '.vue', '.json', '.css'],
//       alias: {
//         vue$: 'vue/ dist / vue.esm.js',
//       '@': resolve('src'),
//       }
//     }
//   }
// }

module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://data.ntpc.gov.tw',
        ws: true,
        changeOrigin: true
      }
    }
  }
};