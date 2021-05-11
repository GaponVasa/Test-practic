"use strict";

const table = document.querySelector("table");
const button = document.querySelector('.addNewUsers input[type="button"');
const divNotFilledField = document.querySelector(".notFilledField");
const tbody = table.tBodies[0];
let memory;
//const myData = base.getBase();

button.addEventListener("click", addNewUser);
window.addEventListener("load", function () {
  //перевіряємо чи існує LocalStorage, якщо так заносимо данні в таблицю
  const localStorageObj = getSetLocalStorage();
  if (localStorageObj) {
    let keys = Object.keys(localStorageObj);
    keys.forEach((el) => {
      addHtmlToTable(
        localStorageObj[el].name,
        localStorageObj[el].email,
        localStorageObj[el].role
      );
    });
  }
});
table.addEventListener("dblclick", editTable);
document.body.addEventListener("click", deleteInput);

function addNewUser() {
  const reg = /([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2,3}))/;
  const nameField = document.querySelector('.addNewUsers input[type="text"]');
  const emailField = document.querySelector('.addNewUsers input[type="email"]');
  const select = document.querySelector(".addNewUsers select");
  const form = document.querySelector(".addNewUsers form");
  let selectValue;
  if (divNotFilledField.style.display === "block") {
    divNotFilledField.style.display = "none";
  }
  if (nameField.value === "") {
    notFilledField(nameField);
  } else if (select.value === "select role") {
    notFilledField(select);
  } else if (!reg.test(emailField.value)) {
    notFilledField(emailField);
  } else {
    selectValue = select.value.toLowerCase();
    addToTable(nameField.value, emailField.value, selectValue);
    form.reset();
  }
}

function notFilledField(field) {
  const coordinates = field.getBoundingClientRect();
  //let top = divNotFilledField.style.top;
  //let left = divNotFilledField.style.left;
  divNotFilledField.style.display = "block";
  if (
    field.name === "userName" ||
    field.name === "userRole" ||
    field.name === "userEmail"
  ) {
    divNotFilledField.style.top = coordinates.bottom + pageYOffset + 9 + "px";
    divNotFilledField.style.left =
      coordinates.left + coordinates.width / 4 + "px";
  }
}

class Person {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class Admin extends Person {
  constructor(name, email) {
    super(name, email);
    this.role = "admin";
  }
}

class User extends Person {
  constructor(name, email) {
    super(name, email);
    this.role = "user";
  }
}

class Guest extends Person {
  constructor(name, email) {
    super(name, email);
    this.role = "guest";
  }
}

function createPerson(name, email, role) {
  if (role === "admin") {
    return new Admin(name, email);
  } else if (role === "user") {
    return new User(name, email);
  } else if (role === "guest") {
    return new Guest(name, email);
  }
}

function addToTable(name, email, role) {
  let objPerson, returnObj, arrKeys, lastKey;
  objPerson = createPerson(name, email, role);
  //console.log("objPerson", objPerson);
  if (localStorage.getItem("myTable")) {
    returnObj = getSetLocalStorage();
    arrKeys = Object.keys(returnObj);
    lastKey = parseInt(arrKeys[arrKeys.length - 1]);
    returnObj[lastKey + 1] = objPerson;
    getSetLocalStorage(returnObj);
    //console.log("ok if");
  } else {
    returnObj = {};
    returnObj["0"] = objPerson;
    getSetLocalStorage(returnObj);
    //console.log("ok else");
  }
  //console.log("returnObj", returnObj);
  addHtmlToTable(name, email, role);
}

function getSetLocalStorage(obj) {
  if (obj) {
    localStorage.setItem("myTable", JSON.stringify(obj));
  } else {
    return JSON.parse(localStorage.getItem("myTable"));
  }
}

function addHtmlToTable(name, email, role) {
  const tbody = table.tBodies[0];
  let html = `<tr><td> ${name} </td><td> ${email} </td><td> ${role} </td></tr>`;
  tbody.innerHTML += html;
}

function editTable(event) {
  const target = event.target;
  let parent, child, arrText, text;
  if (target.tagName === "TD") {
    text = target.innerText;
    parent = target.parentElement;
    child = parent.childNodes;
    arrText = [];
    child.forEach((el) => {
      arrText.push(el.innerText);
    });
    arrText.push(text);
    let arrData = findElement(arrText);
    replacement(arrData, target);
    function outer() {
      function inner() {
        let arr = [arrData, target];
        return arr;
      }
      return inner;
    }
    memory = outer();
  }
}

function findElement(arr) {
  const returnObj = getSetLocalStorage();
  const arrKeys = Object.keys(returnObj);
  let index, nameElement;
  arrKeys.forEach((el, ind) => {
    if (returnObj[el].name === arr[0]) {
      if (returnObj[el].name === arr[3]) {
        nameElement = "name";
      }
      if (returnObj[el].email === arr[1]) {
        if (returnObj[el].email === arr[3]) {
          nameElement = "email";
        }
        if (returnObj[el].role === arr[2]) {
          if (returnObj[el].role === arr[3]) {
            nameElement = "role";
          }
          index = ind;
        }
      }
    }
  });
  return [index, nameElement];
}

function replacement(arr, targetElement, flag) {
  const returnObj = getSetLocalStorage();
  const targetNeme = arr[1];
  const targetNumber = arr[0];
  const text = returnObj[targetNumber][targetNeme];
  const inputText = `<input autofocus type="text" value="${text} ">`;
  let newText;
  if (flag) {
    newText = targetElement.firstElementChild.value;
    newText = newText.replace(/ /g, "");
    targetElement.innerHTML = newText;
    return newText;
  } else {
    targetElement.innerHTML = inputText;
  }
}

function deleteInput(event) {
  let newText;
  if (memory !== undefined) {
    let oldMemory = memory();
    const target = event.target;
    if (
      table.querySelector('input[type="text"]') &&
      target.tagName !== "INPUT"
    ) {
      oldMemory = memory();
      newText = replacement(oldMemory[0], oldMemory[1], "ok");
      makeChange(oldMemory, newText);
    }
  }
}

function makeChange(memory, newText) {
  const returnObj = getSetLocalStorage();
  const key = memory[0][0];
  const name = memory[0][1];
  returnObj[key][name] = newText;
  getSetLocalStorage(returnObj);
}
