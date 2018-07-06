export function components () {
  let array = Array.prototype.slice.apply(arguments, [0])
  return array.reduce((map, c) => { if (c) map[c.name] = c; return map }, {})
}

export default { components }
