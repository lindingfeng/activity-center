module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      rootValue: 75,
      // 需要转px转rem的css属性，*代表所有属性
      propList: ['*'],
      // 2px以下不转为rem
      minPixelValue: 2,
      // 不需要需要转px转rem的css属性，可使用正则
      selectorBlackList: [
        /^body$/,
        /\.no-pxtorem_[0-9a-z_\-]+$/
      ]
    }
  }
}