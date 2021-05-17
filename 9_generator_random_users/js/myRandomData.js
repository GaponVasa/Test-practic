"use strict";

//rules - object налаштуваннь для вихідного масиву даних
//{quantitiesOfUsers, boyOrGirlRelation, first_name, last_name, bithday, phone, email, role}
//quantitiesOfUsers - кількість об'єктів інформації про уявних людей
//boyOrGirlRelation - співвідношення статі
//first_name - ім'я
//last_name - прізвище
// bithday - день народження
//phone - телефон
//email - електронна скринька
//role - статус уявної людини
////////////////////////////////////////////////////////////////////////////////////////////
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
      getRandomBoyOrGirlNumber <= boyOrGirlRelation ? "boy" : "girl";
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
    const maxLength = roles.length - 1;
    const randomNumber = this.PRIVATE_randomNumber(0, maxLength);
    userObj.role = roles[randomNumber];
  }

  PRIVATE_deleteDataBase() {
    this.dataBase = [];
  }

  PRIVATE_createPerson() {
    const userObj = {};

    const rules = this.rules;
    const patternData = this.patternData;
    const boyFirstNameArr = patternData.boyFirstName;
    const girlFirstNameArr = patternData.girlFirstName;
    const lastNameArr = patternData.lastName;
    const domainName = patternData.domain;
    const role = rules.role;
    const isTrueRoles = Array.isArray(role);

    this.PRIVATE_boyOrGirl(userObj, rules);

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

    if (rules.lastName === true) {
      this.PRIVATE_createUserName(
        userObj,
        lastNameArr,
        rules,
        "lastName",
        "lastNameNik"
      );
    }

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
    }
    delete userObj.firstNameNik;
    delete userObj.lastNameNik;
    return userObj;
  }

  generate() {
    const number = this.rules.quantitiesOfUsers;
    this.PRIVATE_deleteDataBase();
    for (let i = 1; i <= number; i++) {
      this.dataBase.push(this.PRIVATE_createPerson());
    }
  }

  getDataBase(array) {
    array.length = 0;
    this.dataBase.forEach((element) => {
      array.push(element);
    });
  }
}
