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
    //console.log(randomDate);
    userObj.bithday = randomDate;
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
    const domainName = patternData.domain;

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
    }
    if (rules.email === true) {
      this.PRIVATE_createEmail(userObj, domainName);
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
