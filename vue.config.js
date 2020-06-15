const vueConfig = {}

vueConfig.lintOnSave = 'warning'

if (process.env.NODE_ENV === 'production') {
  vueConfig.configureWebpack = {
    devtool: false,
    externals: [
      {
        'chart.js': {
          commonjs: 'chart.js',
          commonjs2: 'chart.js',
          root: 'Chart',
        },
      },
      {
        'vue-router': {
          commonjs: 'vue-router',
          commonjs2: 'vue-router',
          root: 'VueRouter',
        },
      },
    ],

    output: {
      libraryExport: 'default',
    },
  }
}

module.exports = vueConfig
