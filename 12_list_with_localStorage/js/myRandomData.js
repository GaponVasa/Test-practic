"use strict";

//rules - object налаштуваннь для вихідного масиву даних
//{id, quantitiesOfUsers, boyOrGirlRelation, first_name, last_name, bithday, phone, email, role}
//id - унікальний ідентифікатор
//quantitiesOfUsers - кількість об'єктів інформації про уявних людей
//boyOrGirlRelation - співвідношення статі користувачів. 0 - тільки дівчатка, 1 - тільки хлопчики.
//first_name - ім'я користувача. true - добавляємо до об'єкту false - не добавляємо.
//last_name - прізвище користувача. true - добавляємо до об'єкту false - не добавляємо.
// bithday - день народження користувача. Object - добавляємо згідно об'єкта, де start - початкова дата(String) end - кінцева дата(String) періоду в якому буде створюватись дата. false - не добавляємо.
//phone - телефон. true - добавляємо до об'єкту false - не добавляємо.
//email - електронна скринька. true - добавляємо до об'єкту false - не добавляємо.
//role - статус користувача. Array - добавляємо до об'єкту згідно ролей зазначених у масиві. Ролі добавляються у форматі рядок(STRING). false - не добавляємо.
////////////////////////////////////////////////////////////////////////////////////////////
// patternData - object набір шаблонів для створення вихідного масиву даних
class GenerateRandomUsersData {
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
    const boyOrGirlResult =
      getRandomBoyOrGirlNumber <= boyOrGirlRelation ? "boy" : "girl";
    if (rules.boyOrGirl === true) {
      userObj.gender = boyOrGirlResult;
    }
    return boyOrGirlResult;
  }

  PRIVATE_createUserName(userObj, nameArr, rules, nameField, nikNameField) {
    const maxLength = nameArr.length - 1;
    const randomNumber = this.PRIVATE_randomNumber(0, maxLength);
    const randomUserPattern = nameArr[randomNumber];
    const randomNikNameArrLength = randomUserPattern.nikname.length - 1;
    const name = randomUserPattern.name;
    if (nameField !== false) {
      userObj[nameField] = name;
    }
    if (rules.email === true) {
      userObj[nikNameField] =
        randomUserPattern.nikname[
          this.PRIVATE_randomNumber(0, randomNikNameArrLength)
        ];
    }
  }

  PRIVATE_createEmail(userObj, emailDomain) {
    const randomNikFirstName = userObj.firstNameNik;
    const randomNikLastName = userObj.lastNameNik;
    const randomNumber = this.PRIVATE_randomNumber(0, 5);
    const emailDomainLength = emailDomain.length - 1;
    const randomEmailDomainNumber = this.PRIVATE_randomNumber(
      0,
      emailDomainLength
    );
    const randomDomain = emailDomain[randomEmailDomainNumber];
    switch (randomNumber) {
      case 0:
        userObj.email =
          randomNikFirstName + "." + randomNikLastName + "@" + randomDomain;
        break;
      case 1:
        userObj.email =
          randomNikLastName + "." + randomNikFirstName + "@" + randomDomain;
        break;
      case 2:
        userObj.email =
          randomNikFirstName + "_" + randomNikLastName + "@" + randomDomain;
        break;
      case 3:
        userObj.email =
          randomNikLastName + "_" + randomNikFirstName + "@" + randomDomain;
        break;
      case 4:
        userObj.email = randomNikFirstName + "@" + randomDomain;
        break;
      case 5:
        userObj.email = randomNikLastName + "@" + randomDomain;
        break;
    }
  }

  PRIVATE_createBirthday(userObj, rulesObject) {
    const startDateObject = new Date(rulesObject.start);
    const endDateObject = new Date(rulesObject.end);
    const randomNumber = this.PRIVATE_randomNumber(
      startDateObject.getTime(),
      endDateObject.getTime()
    );
    const randomDateObject = new Date(randomNumber);
    const randomDate =
      randomDateObject.getDate() +
      "-" +
      randomDateObject.getMonth() +
      "-" +
      randomDateObject.getFullYear();
    userObj.bithday = randomDate;
  }

  PRIVATE_createPhone(userObj) {
    const randomNumber = Math.random().toString().slice(2, 12);
    const phoneNumberArr = randomNumber.split("");
    phoneNumberArr.unshift("(0");
    phoneNumberArr[3] = ")";
    userObj.phone = phoneNumberArr.join("");
  }

  PRIVATE_createRole(userObj, roles) {
    if (!roles) {
      const maxLength = this.patternData.roles.length - 1;
      const randomNumber = this.PRIVATE_randomNumber(0, maxLength);
      userObj.role = this.patternData.roles[randomNumber];
    } else {
      const maxLength = roles.length - 1;
      const randomNumber = this.PRIVATE_randomNumber(0, maxLength);
      userObj.role = roles[randomNumber];
    }
  }

  PRIVATE_deleteDataBase() {
    this.dataBase = [];
  }

  PRIVATE_createPerson(iterNumber) {
    const userObj = {};

    const rules = this.rules;
    const patternData = this.patternData;
    const boyFirstNameArr = patternData.boyFirstName;
    const girlFirstNameArr = patternData.girlFirstName;
    const lastNameArr = patternData.lastName;
    const domainName = patternData.domain;
    const role = rules.role;
    const isTrueRoles = Array.isArray(role);
    const boyOrGirlResult = this.PRIVATE_boyOrGirl(userObj, rules);
    let nameField = false;
    let lastNameField = false;
    let girlBoyNameArr = [];

    if (rules.firstName === true) {
      nameField = "firstName";
    }
    if (boyOrGirlResult === "boy") {
      girlBoyNameArr = boyFirstNameArr;
    } else if (boyOrGirlResult === "girl") {
      girlBoyNameArr = girlFirstNameArr;
    }
    this.PRIVATE_createUserName(
      userObj,
      girlBoyNameArr,
      rules,
      nameField,
      "firstNameNik"
    );

    if (rules.id === true) {
      const date = Date.now();
      userObj.id = date + iterNumber;
    }

    if (rules.lastName === true) {
      lastNameField = "lastName";
    }
    this.PRIVATE_createUserName(
      userObj,
      lastNameArr,
      rules,
      lastNameField,
      "lastNameNik"
    );

    if (typeof rules.bithday === "object") {
      this.PRIVATE_createBirthday(userObj, rules.bithday);
    }

    if (rules.phone === true) {
      this.PRIVATE_createPhone(userObj);
    }

    if (rules.email === true) {
      this.PRIVATE_createEmail(userObj, domainName);
    }

    if (isTrueRoles === true) {
      this.PRIVATE_createRole(userObj, role);
    } else if (role === true) {
      this.PRIVATE_createRole(userObj);
    }

    delete userObj.firstNameNik;
    delete userObj.lastNameNik;
    return userObj;
  }

  generate() {
    const number = this.rules.quantitiesOfUsers;
    this.PRIVATE_deleteDataBase();
    for (let i = 1; i <= number; i++) {
      this.dataBase.push(this.PRIVATE_createPerson(i));
    }
  }

  getDataBase(array) {
    array.length = 0;
    this.dataBase.forEach((element) => {
      array.push(element);
    });
  }
}
