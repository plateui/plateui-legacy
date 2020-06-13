export default function (createElement, views) {
  return views.map(view => {
    return renderItem(createElement, view)
  })
}

function renderGroup (createElement, views, className) {
  let grid = false
  const components = {}
  const cols = views.map(d => {
    components[d.component] = true
    const _classes = ['col']
    if (d.grid) {
      grid = true
      _classes.push(`col_${d.grid}`)
    }
    return createElement('div', { class: _classes }, [
      createElement('p-' + d.component, { props: d.data }),
    ])
  })
  const classes = ['row', `row_${cols.length}`]
  if (grid) {
    classes.push('grid')
  }
  if (Object.keys(components).length === 1) {
    classes.push('_same')
  }
  if (className) {
    classes.push(className)
  }
  return createElement('div', { class: classes }, cols)
}

function renderItem (createElement, view) {
  if (view.views) {
    const children = []
    if (view.name) {
      children.push(createElement('h1', { class: 'section_title' }, [view.name]))
    }
    children.push(renderGroup(createElement, view.views))
    return createElement('section', { class: 'section' }, children)
  }
  return createElement('div', { class: 'section' }, [
    createElement('p-' + view.component, { props: view.data }),
  ])
}
