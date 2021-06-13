function highlight(table) {
  let rows = table.rows;
  for (let i = 0; i < rows.length; i++) {
    let cells = rows[i].cells;
    for (let j = 0; j < cells.length; j++) {
      
      if (cells[j].innerHTML === "Status") {
        let n = 1;
        while (n !== rows.length) {
          if (rows[n].cells[j].getAttribute('data-available') === "true") {
            rows[n].classList.add("available");
          } else if (rows[n].cells[j].getAttribute('data-available') === "false") {
            rows[n].classList.add("unavailable");
          } else {
            rows[n].hidden = true;
          }
          n++;
        }
      }

      if (cells[j].innerHTML === "Gender") {
        let k = 1;
        while (k !== rows.length) {
          if (rows[k].cells[j].innerHTML === "m") {
            rows[k].classList.add("male");
          } else if (rows[k].cells[j].innerHTML === "f") {
            rows[k].classList.add("female");
          }
          k++;
        }
      }

      if (cells[j].innerHTML === "Age") {
        let m = 1;
        while (m !== rows.length) {
          if (Number(rows[m].cells[j].innerHTML) < 18) {
            rows[m].style.textDecoration = "line-through";
          }
          m++;
        }
      }
    }
  }
}