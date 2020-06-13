/* eslint-disable import/no-webpack-loader-syntax */
import featherIcons from '!!raw-loader!./feather-sprite.svg'
import SvgIcon from './SvgIcon.vue'

function install (Vue) {
  const div = document.createElement('div')
  div.className = 'app_svgs'
  div.innerHTML = featherIcons
  document.body.appendChild(div)
  Vue.component(SvgIcon.name, SvgIcon)
}

export default { install }
