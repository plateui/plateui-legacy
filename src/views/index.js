import RouteView from './RouteView'

export default function (data) {
  const routes = []
  data.menus.forEach(menu => {
    menu.routes.forEach(r => {
      routes.push(genRoute(menu.name, r))
    })
  })
  data.routes.forEach(r => {
    routes.push(genRoute('Route', r))
  })
  return routes
}

function genRoute (prefix, r) {
  return {
    path: r.path,
    name: `${prefix}-${r.name}`,
    component: RouteView,
    meta: {
      name: r.name,
      endpoint: r.endpoint,
    },
  }
}
