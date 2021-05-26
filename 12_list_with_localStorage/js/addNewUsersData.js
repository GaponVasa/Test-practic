"use strict";

class addNewUsersData {
  constructor(form, alarmDiv) {
    this.form = form;
    this.nameField = form.querySelector('input[type="text"]');
    this.emailField = form.querySelector('input[type="email"]');
    this.select = form.querySelector("select");
    this.reg = /([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2,3}))/;
    //this.selectValue = null;
    this.divNotFilledField = alarmDiv;
  }

  PRIVATE_notFilledField(field) {
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

  getNewUserData() {
    const newUser = {};
    if (this.divNotFilledField.style.display === "block") {
      this.divNotFilledField.style.display = "none";
    }
    if (this.nameField.value === "") {
      this.PRIVATE_notFilledField(this.nameField);
    } else if (this.select.value === "select role") {
      this.PRIVATE_notFilledField(this.select);
    } else if (!this.reg.test(this.emailField.value)) {
      this.PRIVATE_notFilledField(this.emailField);
    } else {
      //selectValue = this.select.value.toLowerCase();
      newUser["firstName"] = this.nameField.value;
      newUser["email"] = this.emailField.value;
      newUser["role"] = this.select.value.toLowerCase();
      this.form.reset();
      return newUser;
    }
  }
}
