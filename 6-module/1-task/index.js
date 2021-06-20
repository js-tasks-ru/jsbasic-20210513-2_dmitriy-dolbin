/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('div');

    let table = document.createElement('table');
    let thead = table.createTHead();
    let tbody = table.createTBody();
    let thtr = thead.insertRow();
    
    let aNameTh = ["Имя", "Возраст", "Зарплата", "Город", ""];
    for (let i = 0; i < aNameTh.length; i++) {
      let th = document.createElement('th');
      th.innerHTML = aNameTh[i];
      thtr.appendChild(th);
    }
    
    for (let j = 0; j < rows.length; j++) {
      let tbtr = tbody.insertRow();
      let aKeys = Object.keys(rows[j]);
      for (let k = 0; k < aKeys.length + 1; k++) {
        let td = document.createElement('td');
        if (k < aKeys.length) {
          td.innerHTML = rows[j][aKeys[k]];
        } else {
          let button = document.createElement('button');
          button.innerHTML = "X";
          button.addEventListener("click", function (event) {
            event.target.closest('table').deleteRow(this.parentNode.parentNode.rowIndex);
          });
          td.appendChild(button);
        }
        tbtr.appendChild(td);
      }
    }
    this.elem.appendChild(table);
  }
}
