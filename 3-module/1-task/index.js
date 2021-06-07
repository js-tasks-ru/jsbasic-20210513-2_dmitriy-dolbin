function namify(users) {
  let arr = [];
  for (let i = 0; i < users.length; i++) {
    for (let key in users[i]) {
      if (key === 'name') {
        arr.push(users[i][key]);
      }
    }
  }
  return arr;
}

