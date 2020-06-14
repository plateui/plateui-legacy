import TableItem from './TableItem'

export default {
  props: {
    columns: Array,
    item: Object,
  },
  render() {
    const children = this.columns.map(c => {
      const value = this.item[c.key]
      return (<TableItem type={c.type} value={value} />)
    })
    return (<tr>{children}</tr>)
  }
}
