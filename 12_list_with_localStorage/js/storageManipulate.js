"use strict";
//console.log("ok storage");

class localStorageManipulate {
  constructor(nameLocalStorage) {
    this.nameLocalStorage = nameLocalStorage;
  }

  getLocalStorage() {
    const storage = localStorage.getItem(this.nameLocalStorage);
    if (storage !== null) {
      return JSON.parse(storage);
    }
  }

  setLocalStorage(obj) {
    localStorage.setItem(this.nameLocalStorage, JSON.stringify(obj));
  }

  deleteLocalStorage() {
    localStorage.removeItem(this.nameLocalStorage);
  }
}

// function generateRandomLocalStorage() {
//   let returnObj, arrKeys, lastKey, arrDataBaseKeys;
//   dataBase = {};
//   dataBaseHTML = "";
//   const tbody = table.tBodies[0];
//   generateRandomDataBase();
//   //перевіряємо чи є в LocalStorage данні, якщо є, то добавляємо за правилом в if
//   if (localStorage.getItem("myTable")) {
//     returnObj = getSetLocalStorage();
//     arrKeys = Object.keys(returnObj);
//     arrDataBaseKeys = Object.keys(dataBase);
//     lastKey = parseInt(arrKeys[arrKeys.length - 1]) + 1;
//     arrDataBaseKeys.forEach((el, ind) => {
//       returnObj[lastKey + ind] = dataBase[el];
//     });
//     getSetLocalStorage(returnObj);
//   } else {
//     getSetLocalStorage(dataBase);
//   }
//   tbody.innerHTML += dataBaseHTML;
// }
