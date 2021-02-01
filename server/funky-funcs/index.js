const intersection = (arr1, arr2) =>
  arr1.reduce((accum, curVal) =>
    (arr2.indexOf(curVal) !== -1 ? [...accum, curVal] : accum), [])


const flattenDeep = arr => {
  let newArr = []

  arr.forEach(elem => {
    if(Array.isArray(elem)) newArr = [...newArr, ...flattenDeep(elem)]
    else newArr.push(elem)
  })

  return newArr
}
// const flattenDeep = arr => arr.reduce((accum, val) =>
//   Array.isArray(val) ? [...accum, ...flattenDeep(val)] : [...accum, val], [])


const flipArguments = func => (...args) => {
  const flipped = args.reverse()
  return func(...flipped)
}


const invert = (obj) => {
  const keys = Object.keys(obj)
  const vals = Object.values(obj)
  const inverted = {}

  for(let i = 0; i < keys.length; i++) {
    let str = vals[i].toString()
    inverted[str] = keys[i]
  }
  return inverted
}
// const invert = (obj) =>
//   Object.keys(obj).reduce((accum, val) => {
//     accum[obj[val]] = val
//     return accum
//   }, {})


const camelCase = str => {
  let x = str
    .split(/[\s_]+/)
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join('')

  return x[0].toLowerCase() + x.slice(1)
}


module.exports = {
  intersection,
  flattenDeep,
  flipArguments,
  invert,
  camelCase
}
