"use strict";

const formUserData = document.getElementById("addNewUserData");
const table = document.querySelector("table");
const button = document.querySelector('.addNewUsers input[type="button"');
const divNotFilledField = document.querySelector(".notFilledField");
let memory;
const userData = new addNewUsersData(formUserData, divNotFilledField);

button.addEventListener("click", () => {
  const newUserData = userData.getNewUserData();
  // console.log(
  //   newUserData === undefined ? "nothin in newUserData" : newUserData
  // );
  if (newUserData !== undefined) {
    addNewUserToLocalStorage(storageManipulate, newUserData);
    renderTable(storageManipulate, usersTable, thead, tbody);
  }
});
window.addEventListener("load", function () {
  renderTable(storageManipulate, usersTable, thead, tbody);
});

//table.addEventListener("dblclick", editTable);
//document.body.addEventListener("click", deleteInput);

function renderTable(storagManipulation, tabelManipulation, thead, tbody) {
  const localStorageArr = storagManipulation.getLocalStorage();
  if (localStorageArr !== undefined) {
    tabelManipulation.setDataBase(localStorageArr);
    tabelManipulation.create(thead, tbody);
  }
}

function addNewUserToLocalStorage(storagManipulation, newUser) {
  const oldStorage = storagManipulation.getLocalStorage();
  oldStorage.push(newUser);
  storagManipulation.setLocalStorage(oldStorage);
}

//////////////////////////////////////////////////////////////////////

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
