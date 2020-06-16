const vueConfig = {}

vueConfig.lintOnSave = 'warning'

if (process.env.NODE_ENV === 'production') {
  vueConfig.configureWebpack = {
    devtool: false,
    externals: [
      {
        moment: {
          commonjs: 'moment',
          commonjs2: 'moment',
          root: 'moment',
        },
      },
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
} else if (process.env.DEV_ADMIN) {
  const TARGET = process.env.API_TARGET || 'http://127.0.0.1:5100'
  vueConfig.devServer = {
    disableHostCheck: true,
    proxy: {
      '/api/_plate/': { target: TARGET },
    },
  }
}

module.exports = vueConfig
