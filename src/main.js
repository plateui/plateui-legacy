import plate from './index'
import demo from './demo'

demo(plate)

window.plate = plate

const endpoint = '/demo/plate.json'
// const endpoint = '/api/_plate/_/main'

plate.init(endpoint).then(app => {
  app.$mount('#app')
})
