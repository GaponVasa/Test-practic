"use strict";

class AddNewUsersData {
  constructor(form) {
    this.form = form;
    this.nameField = document.getElementById("nameInput");
    this.emailField = document.getElementById("emailInput");
    this.select = document.getElementById("userRoleSelect");
    this.reg = /([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2,3}))/;
    this.notValidateElement = [];
    this.arrayClassList = ["borderGray", "borderRed", "colorWhite", "colorRed"];
  }

  PRIVATE_toggleClass(element, elementError) {
    const arrayClassList = this.arrayClassList;
    element.classList.toggle(arrayClassList[0]);
    element.classList.toggle(arrayClassList[1]);
    elementError.classList.toggle(arrayClassList[2]);
    elementError.classList.toggle(arrayClassList[3]);
  }

  PRIVATE_notFilledField(field) {
    //console.log("PRIVATE_notFilledField");
    const fieldId = field.id;
    const fieldErrorName = fieldId + "Error";
    const fieldError = document.getElementById(fieldErrorName);
    if (
      field.name === "userName" ||
      field.name === "userRole" ||
      field.name === "userEmail"
    ) {
      //console.log("PRIVATE_notFilledField if...");
      this.notValidateElement.push(field, fieldError);
      this.PRIVATE_toggleClass(field, fieldError);
    }
  }

  getNewUserData() {
    const newUser = {};
    const nameFieldValue = this.nameField.value === "";
    const emailFieldValue = this.emailField.value;
    const emailFieldValueIsValid = this.reg.test(emailFieldValue);
    const selectValueIsSelected = this.select.value === "select role";

    // console.log("getNewUserData()   this.select.value = ", this.select.value);
    // console.log(
    //   "getNewUserData()  selectValueIsSelected = ",
    //   selectValueIsSelected
    // );
    if (this.notValidateElement.length !== 0) {
      const element = this.notValidateElement[0];
      const elementError = this.notValidateElement[1];
      this.PRIVATE_toggleClass(element, elementError);
      this.notValidateElement.length = 0;
    }
    if (nameFieldValue) {
      this.PRIVATE_notFilledField(this.nameField);
    } else if (!emailFieldValueIsValid) {
      this.PRIVATE_notFilledField(this.emailField);
    } else if (selectValueIsSelected) {
      //console.log("ok slect");
      this.PRIVATE_notFilledField(this.select);
    } else {
      //console.log("ok new user");

      newUser["firstName"] = this.nameField.value;
      newUser["id"] = Date.now();
      newUser["email"] = this.emailField.value;
      newUser["role"] = this.select.value.toLowerCase();

      this.form.reset();
      return newUser;
    }
    return "no user";
  }
}
