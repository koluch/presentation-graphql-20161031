const merge = (...args) => Object.assign({}, ...args)
const find = (array, f) => array.filter(f)[0]

module.exports = {merge, find}
