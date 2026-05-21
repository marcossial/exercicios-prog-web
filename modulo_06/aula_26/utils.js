function somarArray(arr) {
  return arr.reduce((acc, e) => acc + e, 0);
}

function raizQuadradaArray(arr) {
  return arr.map(Math.sqrt);
}

module.exports = { somarArray, raizQuadradaArray };