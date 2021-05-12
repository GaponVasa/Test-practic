"use strict";

//rules - object налаштуваннь для вихідного масиву даних
//{quantitiesOfUsers, boyOrGirlRelation, first_name, last_name, bithday, phone, email, role}
// patternData - object набір шаблонів для створення вихідного масиву даних
class generateRandomUsersData {
  constructor(rules, patternData) {
    this.rules = rules;
    this.patternData = patternData;
    this.dataBase = [];
  }

  PRIVATE_randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  PRIVATE_boyOrGirl(userObj, rules) {
    const getRandomBoyOrGirlNumber = this.PRIVATE_randomNumber(0, 10);
    const boyOrGirlRelation = rules.boyOrGirlRelation * 10;
    userObj.gender =
      getRandomBoyOrGirlNumber >= boyOrGirlRelation ? "boy" : "girl";
  }

  PRIVATE_createUserName(userObj, nameArr, rules, nameField, nikNameField) {
    const maxLength = nameArr.length - 1;
    const randomNumber = this.PRIVATE_randomNumber(0, maxLength);
    const randomUserPattern = nameArr[randomNumber];
    const randomNikNameArrLength = randomUserPattern.nikname.length - 1;
    const name = randomUserPattern.name;
    userObj[nameField] = name;
    if (rules.email === true) {
      userObj[nikNameField] =
        randomUserPattern.nikname[
          this.PRIVATE_randomNumber(0, randomNikNameArrLength)
        ];
    }
  }

  PRIVATE_createPerson() {
    const userObj = {
      gender: "",
      firstName: "",
      firstNameNik: "",
      lastName: "",
      lastNameNik: "",
      bithday: "",
      phone: "",
      email: "",
      role: "",
    };

    const rules = this.rules;
    const patternData = this.patternData;
    const boyFirstNameArr = patternData.boyFirstName;
    const girlFirstNameArr = patternData.girlFirstName;
    const lastNameArr = patternData.lastName;
    const eMailSecondArr = patternData.eMailSecond;

    this.PRIVATE_boyOrGirl(userObj, rules);
    //console.log(boyFirstNameArr);
    if (userObj.gender === "boy") {
      this.PRIVATE_createUserName(
        userObj,
        boyFirstNameArr,
        rules,
        "firstName",
        "firstNameNik"
      );
    } else if (userObj.gender === "girl") {
      this.PRIVATE_createUserName(
        userObj,
        girlFirstNameArr,
        rules,
        "firstName",
        "firstNameNik"
      );
    }
    //console.log(rules.last_name);
    if (rules.lastName === true) {
      //console.log("ok");
      this.PRIVATE_createUserName(
        userObj,
        lastNameArr,
        rules,
        "lastName",
        "lastNameNik"
      );
    }
    if (rules.bithday === true) {
    }
    if (rules.phone === true) {
    }
    if (rules.email === true) {
    }
    if (rules.role === true) {
    }

    return userObj;
  }

  generate() {
    let number = this.rules.quantitiesOfUsers;
    for (let i = 1; i <= number; i++) {
      this.dataBase.push(this.PRIVATE_createPerson());
    }
    console.log(this.dataBase);
  }
}

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

generateUsers.generate();

function generateRandomLocalStorage() {
  let returnObj, arrKeys, lastKey, arrDataBaseKeys;
  dataBase = {};
  //dataBaseHTML = "";
  //const tbody = table.tBodies[0];
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
  //tbody.innerHTML += dataBaseHTML;
}

function generateRandomDataBase() {
  const num = 10; //кількість створюваних персон
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  let randomEmail = (obj, numFirstName, numLastName, gender) => {
    let arrLength;
    const randSecondEmail =
      obj.eMailSecond[random(0, obj.eMailSecond.length - 1)];
    arrLength = obj.lastName[numLastName].nikname.length;
    const randomNiknameLastName =
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
      dataArr = person(randomUsersData, "boy");
    } else {
      dataArr = person(randomUsersData, "girl");
    }
    dataBase[i - 1] = createPerson(dataArr[0], dataArr[1], dataArr[2]);
    //dataBaseHTML += `<tr><td> ${dataArr[0]} </td><td> ${dataArr[1]} </td><td> ${dataArr[2]} </td></tr>`;
    boyOrGirl = random(1, 7);
  }
}
