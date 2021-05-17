"use strict";
class createTable {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  PRIVATE_createHeader(fields) {
    const tr = document.createElement("tr");
    fields.forEach((element) => {
      const th = document.createElement("th");
      th.innerHTML = element;
      tr.appendChild(th);
    });
    return tr;
  }

  PRIVATE_addUsers(tbody, fields) {
    this.dataBase.forEach((element) => {
      const tr = document.createElement("tr");

      fields.forEach((innElement) => {
        const td = document.createElement("td");
        td.innerHTML = element[innElement];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  create(thead, tbody) {
    const fieldsArr = Object.keys(this.dataBase[0]);
    this.clearTable(thead, tbody);
    thead.appendChild(this.PRIVATE_createHeader(fieldsArr));
    this.PRIVATE_addUsers(tbody, fieldsArr);
  }

  clearTable(thead, tbody) {
    thead.innerHTML = "";
    tbody.innerHTML = "";
  }

  setDataBase(dataBase) {
    this.dataBase = dataBase;
  }
}
