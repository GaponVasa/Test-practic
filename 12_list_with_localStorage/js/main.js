"use strict";

const myRules = {
  id: true,
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

const table = document.querySelector(".usersTable table");
const nameStorage = "myTable";
const dataBase = [];
const formUserData = document.getElementById("addNewUserData");
const button = document.querySelector(".addNewUsers button");
const divNotFilledField = document.querySelector(".notFilledField");
const button1 = document.getElementById("delete");
const button2 = document.getElementById("generate");
const button3 = document.getElementById("toDisplay");
const valueArr = ["firstName", "email", "role"];
const dataArr = ["id"];
const addData = "id";

const generateUsers = new GenerateRandomUsersData(myRules, randomUsersData);
const usersTable = new ManipulateWithTable(
  table,
  dataBase,
  valueArr,
  dataArr,
  addData
);
const storageManipulate = new LocalStorageManipulate(nameStorage);
const userData = new AddNewUsersData(formUserData, divNotFilledField);

//-------------------Button Delete Local Storage---------------------
button1.addEventListener("click", () => {
  console.info("The local storage deleted");
  storageManipulate.deleteLocalStorage();
  usersTable.clearTable(undefined, "tbody");
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
  usersTable.create();
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
//------------------Button for add new user-------------------------
button.addEventListener("click", (event) => {
  const newUserData = userData.getNewUserData();
  //console.log('button.addEventListener("click" ... newUserData =', newUserData);
  if (newUserData !== "no user") {
    // console.log('if (newUserData !== "no user")');
    // console.log(newUserData);
    addNewUserToLocalStorage(storageManipulate, newUserData);
    renderTable(storageManipulate, usersTable);
  }
  event.preventDefault();
});
//------------------After load window render Table-----------------
window.addEventListener("load", function () {
  renderTable(storageManipulate, usersTable);
});

//------------------Start edit cell--------------------------------
table.addEventListener("dblclick", (event) => {
  usersTable.addInputToTable(event);
});

table.addEventListener("click", (event) => {
  //console.log(event.target.id === "buttonOk");
  const buttonOkClick = event.target.id === "buttonOk";
  if (buttonOkClick) {
    const resultArr = usersTable.deleteInputFromTable(event);
    if (resultArr !== undefined) {
      const index = resultArr[0];
      const nameField = resultArr[1];
      const value = resultArr[2];
      const obj = storageManipulate.getLocalStorage();
      obj[index][nameField] = value;
      storageManipulate.setLocalStorage(obj);
      usersTable.setDataBase(storageManipulate.getLocalStorage());
      usersTable.create();
    } else {
      return false;
    }
  }
});

function renderTable(storagManipulation, tabelManipulation) {
  const localStorageArr = storagManipulation.getLocalStorage();
  //console.log("renderTable()  localStorageArr = ", localStorageArr);
  if (localStorageArr !== null) {
    tabelManipulation.setDataBase(localStorageArr);
    tabelManipulation.create();
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
