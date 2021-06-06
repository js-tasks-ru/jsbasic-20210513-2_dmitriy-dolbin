function sumSalary(salaries) {
  let nSumSalary = 0;
  for (let key in salaries) {
    if (typeof(salaries[key]) === 'number' && isFinite(salaries[key])) {
      nSumSalary += salaries[key];
    }
  }
  return nSumSalary;
}