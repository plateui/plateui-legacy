export default {
  props: {
    columns: Array,
  },
  render () {
    const children = this.columns.map(c => {
      // TODO: sortable
      return (<th>{c.name}</th>)
    })
    return (<thead>
      <tr>{children}</tr>
    </thead>)
  },
}
