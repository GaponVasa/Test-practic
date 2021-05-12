"use strict";

//-------------------Button Delete Local Storage---------------------
const button1 = document.getElementById("delete");
button1.addEventListener("click", deleteRandomUsersObject);
function deleteRandomUsersObject() {
  console.log("delete RandomUsersObject");
}

//------------------Button Generate Random Local Storage------------
const button2 = document.getElementById("generate");

const myRules = {
  quantitiesOfUsers: 10,
  boyOrGirlRelation: 0.5,
  firstName: true,
  lastName: true,
  bithday: false,
  phone: false,
  email: true,
  role: false,
};

const generateUsers = new generateRandomUsersData(myRules, randomUsersData);

button2.addEventListener("click", () => {
  generateUsers.generate();
});

//------------------Button To display Local Storage-----------------
const button3 = document.getElementById("toDisplay");
button3.addEventListener("click", toRandomUsersObject);
function toRandomUsersObject() {
  console.log("display RandomUsersObject");
}
