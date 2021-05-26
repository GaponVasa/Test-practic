"use strict";
class createTable {
  constructor(dataBase) {
    this.dataBase = dataBase;
    this.fields = this.dataBase[0] ? Object.keys(this.dataBase[0]) : null;
  }

  PRIVATE_createHeader() {
    const tr = document.createElement("tr");
    this.fields.forEach((element) => {
      const th = document.createElement("th");
      th.innerHTML = element;
      tr.appendChild(th);
    });
    return tr;
  }

  PRIVATE_addAllUsers(tbody) {
    this.dataBase.forEach((element) => {
      const tr = document.createElement("tr");
      this.fields.forEach((innElement) => {
        const td = document.createElement("td");
        td.innerHTML = element[innElement];
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  create(thead, tbody) {
    this.clearTable(thead, tbody);
    thead.appendChild(this.PRIVATE_createHeader());
    this.PRIVATE_addAllUsers(tbody);
  }

  clearTable(tbody, thead) {
    if (thead) {
      thead.innerHTML = "";
    }
    if (tbody) {
      tbody.innerHTML = "";
    }
  }

  setDataBase(dataBase) {
    this.dataBase = dataBase;
    this.fields = Object.keys(this.dataBase[0]);
  }
}
