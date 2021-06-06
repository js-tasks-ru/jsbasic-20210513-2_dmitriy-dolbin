function filterRange(arr, a, b) {
  let aNewarr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= a && arr[i] <= b) {
      aNewarr.push(arr[i]);
    }
  }
  return aNewarr;
}
