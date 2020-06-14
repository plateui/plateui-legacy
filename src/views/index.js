import RouteView from './RouteView'

export default function (menus) {
  const routes = []
  menus.forEach(menu => {
    menu.routes.forEach(r => {
      const path = menu.path + r.path
      routes.push({
        path,
        name: `${menu.name}-${r.name}`,
        component: RouteView,
        meta: {
          name: r.name,
          endpoint: r.endpoint,
        },
      })
    })
  })
  return routes
}
