function camelize(str) {
  let arr = str.split('-');
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '') {
      if (!isNaN(Number(arr[i]))) {
        return '';
      } else {
        if (i > 0) {
          arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1, arr[i].length);
        }
      }
    }
  }
  return arr.join('');
}