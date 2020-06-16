import plate from './index'

window.plate = plate

const endpoint = '/demo/plate.json'
// const endpoint = '/api/_plate/_/main'

plate.init(endpoint).then(app => {
  app.$mount('#app')
})
