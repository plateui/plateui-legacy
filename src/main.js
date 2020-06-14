import plate from './index'

window.plate = plate

plate.init('/plate.json').then(app => {
  app.$mount('#app')
})
