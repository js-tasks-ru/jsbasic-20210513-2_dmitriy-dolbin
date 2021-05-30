function factorial(n) {
  if (n === 0 || n === 1)
    return 1;
  else {
    let result = 1;
    for (let i = 0; i < n; i++) {
      result = result * (n - i);
    }
    return result;
  }
}