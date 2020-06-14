export default {
  props: {
    type: String,
    value: [String, Boolean, Number, Array, Object],
  },
  render() {
    // TODO: type
    return (<span>{this.value}</span>)
  },
}
