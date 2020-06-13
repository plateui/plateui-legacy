import plate from './index'

window.plate = plate

plate.init('/data/index.json').then(app => {
  app.$mount('#app')
})
