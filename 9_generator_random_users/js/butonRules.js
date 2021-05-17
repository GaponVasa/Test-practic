"use strict";
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const myRules =
  // {
  //   quantitiesOfUsers: 3,
  //   boyOrGirlRelation: 0.5,
  //   firstName: true,
  //   lastName: true,
  //   bithday: false,
  //   phone: false,
  //   email: false,
  //   role: false,
  // };
  {
    quantitiesOfUsers: 5,
    boyOrGirlRelation: 0.5,
    firstName: true,
    lastName: true,
    bithday: { start: "1970-01-01", end: "2010-01-01" },
    phone: true,
    email: true,
    role: ["Admin", "User", "Guest"],
  };
const generateUsers = new generateRandomUsersData(myRules, randomUsersData);
const dataBase = [];
const usersTable = new createTable(dataBase);

//-------------------Button Random Users Object---------------------
const button1 = document.getElementById("delete");
button1.addEventListener("click", () => {
  usersTable.clearTable(thead, tbody);
  dataBase.length = 0;
});

//------------------Button Generate Random Users Object------------
const button2 = document.getElementById("generate");

button2.addEventListener("click", () => {
  generateUsers.generate();
  generateUsers.getDataBase(dataBase);
  usersTable.setDataBase(dataBase);
  usersTable.create(thead, tbody);
});

//------------------Button To display Random Users Object-----------------
const button3 = document.getElementById("toDisplay");
button3.addEventListener("click", () => {
  console.log(dataBase);
});
