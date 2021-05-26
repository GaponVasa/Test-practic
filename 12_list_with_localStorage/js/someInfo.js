"use strict";
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const nameStorage = "myTable";
const myRules = {
  quantitiesOfUsers: 7,
  boyOrGirlRelation: 0.5,
  boyOrGirl: false,
  firstName: true,
  lastName: false,
  bithday: false,
  phone: false,
  email: true,
  role: true,
};
// {
//   quantitiesOfUsers: 5,
//   boyOrGirlRelation: 0.5,
//   boyOrGirl: true,
//   firstName: true,
//   lastName: true,
//   bithday: { start: "1970-01-01", end: "2010-01-01" },
//   phone: true,
//   email: true,
//   role: ["Admin", "User", "Guest_1", "Guest_2", "Premium_Guest"],
// };
const generateUsers = new generateRandomUsersData(myRules, randomUsersData);
const dataBase = [];
const usersTable = new createTable(dataBase);
const storageManipulate = new localStorageManipulate(nameStorage);

//-------------------Button Delete Local Storage---------------------
const button1 = document.getElementById("delete");
button1.addEventListener("click", deleteLocalStorage);
function deleteLocalStorage() {
  console.log("Dlete Local Storage");
  storageManipulate.deleteLocalStorage();
  usersTable.clearTable(tbody);
}

//------------------Button Generate Random Local Storage------------
const button2 = document.getElementById("generate");
let dataBaseHTML;
button2.addEventListener("click", () => {
  generateUsers.generate();
  generateUsers.getDataBase(dataBase);
  storageManipulate.setLocalStorage(dataBase);
  usersTable.setDataBase(dataBase);
  usersTable.create(thead, tbody);
});

//------------------Button To display Local Storage-----------------
const button3 = document.getElementById("toDisplay");
button3.addEventListener("click", toDisplayLocalStorage);
function toDisplayLocalStorage() {
  const obj = storageManipulate.getLocalStorage();
  if (obj === null) {
    console.log("Local Storage not created");
  } else {
    console.log("Get Local Storage", obj);
  }
}
