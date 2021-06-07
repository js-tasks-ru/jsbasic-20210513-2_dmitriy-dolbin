function getMinMax(str) {
  let arr = str.split(/[\s,]+/);
  let aNewarr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(Number(arr[i]))) {
      aNewarr.push(Number(arr[i]));
    }
  }
  let min = Math.min.apply(null, aNewarr);
  let max = Math.max.apply(null, aNewarr);
  let result = {
    'min': min,
    'max': max
  };
  return result;
}