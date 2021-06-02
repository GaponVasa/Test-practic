"use strict";

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

const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const nameStorage = "myTable";
const dataBase = [];
const formUserData = document.getElementById("addNewUserData");
const table = document.querySelector("table");
const button = document.querySelector(".addNewUsers button");
const divNotFilledField = document.querySelector(".notFilledField");
const button1 = document.getElementById("delete");
const button2 = document.getElementById("generate");
const button3 = document.getElementById("toDisplay");

const generateUsers = new generateRandomUsersData(myRules, randomUsersData);
const usersTable = new createTable(dataBase);
const storageManipulate = new localStorageManipulate(nameStorage);
const userData = new addNewUsersData(formUserData, divNotFilledField);

//-------------------Button Delete Local Storage---------------------
button1.addEventListener("click", () => {
  console.info("The local storage deleted");
  storageManipulate.deleteLocalStorage();
  usersTable.clearTable(tbody);
});
//------------------Button Generate Random Local Storage------------
button2.addEventListener("click", () => {
  generateUsers.generate();
  generateUsers.getDataBase(dataBase);
  const getDataBase = storageManipulate.getLocalStorage();
  if (getDataBase === null) {
    storageManipulate.setLocalStorage(dataBase);
  } else if (Array.isArray(getDataBase)) {
    storageManipulate.setLocalStorage(getDataBase.concat(dataBase));
  }
  usersTable.setDataBase(storageManipulate.getLocalStorage());
  usersTable.create(thead, tbody);
});
//------------------Button To display Local Storage-----------------
button3.addEventListener("click", () => {
  const obj = storageManipulate.getLocalStorage();
  if (obj === null) {
    console.info("Local Storage not created");
  } else {
    console.info("Get Local Storage in table");
    console.table(obj);
  }
});
//------------------Add new user-----------------------------------
button.addEventListener("click", () => {
  const newUserData = userData.getNewUserData();
  if (newUserData !== undefined) {
    addNewUserToLocalStorage(storageManipulate, newUserData);
    renderTable(storageManipulate, usersTable, thead, tbody);
  }
});
//------------------After load window render Table-----------------
window.addEventListener("load", function () {
  renderTable(storageManipulate, usersTable, thead, tbody);
});

//table.addEventListener("dblclick", editTable);
//document.body.addEventListener("click", deleteInput);

function renderTable(storagManipulation, tabelManipulation, thead, tbody) {
  const localStorageArr = storagManipulation.getLocalStorage();
  if (localStorageArr !== null) {
    tabelManipulation.setDataBase(localStorageArr);
    tabelManipulation.create(thead, tbody);
  }
}

function addNewUserToLocalStorage(storagManipulation, newUser) {
  const oldStorage =
    Array.isArray(storagManipulation.getLocalStorage()) === true
      ? storagManipulation.getLocalStorage()
      : [];
  oldStorage.push(newUser);
  storagManipulation.setLocalStorage(oldStorage);
}
