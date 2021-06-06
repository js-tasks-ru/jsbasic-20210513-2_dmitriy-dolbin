function showSalary(users, age) {
  let sResult = "";
  for (let i = 0; i < users.length; i++) {
    if (users[i]['age'] <= age) {
      sResult += users[i]['name'] + ', ' + users[i]['balance'] + '\n';
    }
  }
  return sResult.slice(0, sResult.length - 1);
}