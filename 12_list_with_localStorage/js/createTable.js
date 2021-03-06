"use strict";
class ManipulateWithTable {
  constructor(table, dataBase, nameValueArr, nameDataArr, addData) {
    this.thead = table.querySelector("thead");
    this.tbody = table.querySelector("tbody");
    this.table = table;
    this.dataBase = dataBase;
    this.fields = this.dataBase[0] ? Object.keys(this.dataBase[0]) : null;
    this.nameValueArr = nameValueArr || [];
    this.nameDataArr = nameDataArr || [];
    this.addData = addData;
    this.editingValue = undefined;
    this.editingName = undefined;
    this.arrAddrEditingObj = undefined;
    this.editingTag = undefined;
    this.editFlag = false;
  }

  PRIVATE_createHeader() {
    const tr = document.createElement("tr");
    this.fields.forEach((element) => {
      this.nameValueArr.forEach((el) => {
        if (element === el) {
          const th = document.createElement("th");
          th.innerHTML = element;
          tr.appendChild(th);
        }
      });
    });
    return tr;
  }

  PRIVATE_addAllRows() {
    // console.log(this.dataBase);
    // console.dir(this.dataBase);
    this.dataBase.forEach((element) => {
      const tr = document.createElement("tr");
      this.fields.forEach((innElement) => {
        this.nameDataArr.forEach((el) => {
          if (innElement !== el) {
            const td = document.createElement("td");
            td.innerHTML = element[innElement];
            td.setAttribute("data-id", element[this.addData]);
            tr.appendChild(td);
          }
        });
      });
      this.tbody.appendChild(tr);
    });
  }

  PRIVATE_findTableValue(target) {
    const dataId = parseInt(target.getAttribute("data-id"));
    if (target.tagName === "TD") {
      const targetCellIndex = target.cellIndex;
      this.editingValue = target.innerText;
      this.editingName = this.table.rows[0].cells[targetCellIndex].innerHTML;
      this.arrAddrEditingObj = this.dataBase.findIndex((Obj) => {
        if (Obj[this.addData] === dataId) {
          return true;
        } else {
          return false;
        }
      });
      // console.log("this.editingValue = ", this.editingValue);
      // console.log("this.editingName = ", this.editingName);
      // console.log("this.arrAddrEditingObj = ", this.arrAddrEditingObj);
    }
  }

  addInputToTable(event) {
    const target = event.target;
    this.editingTag = target;
    this.PRIVATE_findTableValue(target);
    target.innerHTML = `<div class="group"><input type="text" value="${this.editingValue} "/><button id="buttonOk">OK</button></div>`;
    target.querySelector("input").focus();
    this.editFlag = true;
  }

  deleteInputFromTable(event) {
    const target = event.target;
    if (this.editFlag === true && target.tagName !== "INPUT") {
      const targetArr = [];
      const inputValue = this.editingTag.querySelector("input").value;
      this.editFlag = false;
      this.editingTag.innerHTML = inputValue;
      targetArr[0] = this.arrAddrEditingObj;
      targetArr[1] = this.editingName;
      targetArr[2] = inputValue;
      return targetArr;
    }
  }

  create() {
    this.clearTable("thead", "tbody");
    this.thead.appendChild(this.PRIVATE_createHeader());
    this.PRIVATE_addAllRows(this.tbody);
  }

  clearTable(thead, tbody) {
    if (thead === "thead") {
      this.thead.innerHTML = "";
    }
    if (tbody === "tbody") {
      this.tbody.innerHTML = "";
    }
  }

  setDataBase(dataBase) {
    this.dataBase = dataBase;
    this.fields = Object.keys(this.dataBase[0]);
  }
}
