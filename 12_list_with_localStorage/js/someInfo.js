"use strict";

//-------------------Button Delete Local Storage---------------------
const button1 = document.getElementById("delete");
button1.addEventListener("click", deleteLocalStorage);
function deleteLocalStorage() {
  localStorage.removeItem("myTable");
  console.log("Dlete Local Storage");
  tbody.innerHTML = "<tr><th>name</th><th>email</th><th>role</th></tr>";
}

//------------------Button Generate Random Local Storage------------
const button2 = document.getElementById("generate");
let dataBase, dataBaseHTML;
button2.addEventListener("click", generateRandomLocalStorage);

function generateRandomLocalStorage() {
  let returnObj, arrKeys, lastKey, arrDataBaseKeys;
  dataBase = {};
  dataBaseHTML = "";
  const tbody = table.tBodies[0];
  generateRandomDataBase();
  //перевіряємо чи є в LocalStorage данні, якщо є, то добавляємо за правилом в if
  if (localStorage.getItem("myTable")) {
    returnObj = getSetLocalStorage();
    arrKeys = Object.keys(returnObj);
    arrDataBaseKeys = Object.keys(dataBase);
    lastKey = parseInt(arrKeys[arrKeys.length - 1]) + 1;
    arrDataBaseKeys.forEach((el, ind) => {
      returnObj[lastKey + ind] = dataBase[el];
    });
    getSetLocalStorage(returnObj);
  } else {
    getSetLocalStorage(dataBase);
  }
  tbody.innerHTML += dataBaseHTML;
}

function generateRandomDataBase() {
  const num = 10; //кількість створюваних персон
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  let randomEmail = (obj, numFirstName, numLastName, gender) => {
    let arrLength;
    let randSecondEmail =
      obj.eMailSecond[random(0, obj.eMailSecond.length - 1)];
    arrLength = obj.lastName[numLastName].nikname.length;
    let randomNiknameLastName =
      obj.lastName[numLastName].nikname[random(0, arrLength - 1)];
    let randomNikameFirstName;
    if (gender == "boy") {
      arrLength = obj.boyFirstName[numFirstName].nikname.length;
      randomNikameFirstName =
        obj.boyFirstName[numFirstName].nikname[random(0, arrLength - 1)];
    } else {
      arrLength = obj.girlFirstName[numFirstName].nikname.length;
      randomNikameFirstName =
        obj.girlFirstName[numFirstName].nikname[random(0, arrLength - 1)];
    }

    switch (random(0, 5)) {
      case 0:
        return (
          randomNikameFirstName +
          "." +
          randomNiknameLastName +
          "@" +
          randSecondEmail
        );
        break;
      case 1:
        return (
          randomNiknameLastName +
          "." +
          randomNikameFirstName +
          "@" +
          randSecondEmail
        );
        break;
      case 2:
        return (
          randomNikameFirstName +
          "_" +
          randomNiknameLastName +
          "@" +
          randSecondEmail
        );
        break;
      case 3:
        return (
          randomNiknameLastName +
          "_" +
          randomNikameFirstName +
          "@" +
          randSecondEmail
        );
        break;
      case 4:
        return randomNikameFirstName + "@" + randSecondEmail;
        break;
      case 5:
        return randomNiknameLastName + "@" + randSecondEmail;
        break;
    }
  };

  let person = (myObj, gender) => {
    let eMail, name;
    let numberFirstName;
    const numberRole = random(0, myObj.role.length - 1);
    const role = myObj.role[numberRole];
    let numberLastName = random(0, myObj.lastName.length - 1);
    if (gender == "boy") {
      numberFirstName = random(0, myObj.boyFirstName.length - 1);
      name = myObj.boyFirstName[numberFirstName].name;
    } else {
      numberFirstName = random(0, myObj.girlFirstName.length - 1);
      name = myObj.girlFirstName[numberFirstName].name;
    }
    eMail = randomEmail(myObj, numberFirstName, numberLastName, gender);
    return [name, eMail, role];
  };

  let boyOrGirl = random(1, 7);
  let dataArr;
  for (let i = 1; i <= num; i++) {
    if (boyOrGirl >= 4) {
      dataArr = person(myData, "boy");
    } else {
      dataArr = person(myData, "girl");
    }
    dataBase[i - 1] = createPerson(dataArr[0], dataArr[1], dataArr[2]);
    dataBaseHTML += `<tr><td> ${dataArr[0]} </td><td> ${dataArr[1]} </td><td> ${dataArr[2]} </td></tr>`;
    boyOrGirl = random(1, 7);
  }
}

//------------------Button To display Local Storage-----------------
const button3 = document.getElementById("toDisplay");
button3.addEventListener("click", toDisplayLocalStorage);
function toDisplayLocalStorage() {
  let obj = JSON.parse(localStorage.getItem("myTable"));
  if (obj === null) {
    console.log("Local Storage not created");
  } else {
    console.log("Get Local Storage", obj);
  }
}
