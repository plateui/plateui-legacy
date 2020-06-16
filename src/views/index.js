import RouteView from './RouteView'

export default function (data) {
  const routes = []
  data.menus.forEach(menu => {
    menu.routes.forEach(r => {
      routes.push(genRoute(r))
    })
  })
  if (data.routes) {
    data.routes.forEach(r => {
      routes.push(genRoute(r))
    })
  }
  return routes
}

function genRoute (r) {
  return {
    path: r.path,
    name: r.name,
    component: RouteView,
    meta: {
      name: r.name,
      endpoint: r.endpoint,
    },
  }
}
