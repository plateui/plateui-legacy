import plate from './index'
import demo from './demo'
demo(plate)

// const endpoint = '/api/_plate/_/main'
const endpoint = '/demo/plate.json'
plate.init(endpoint, '#app')

export default plate
