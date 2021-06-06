"use strict";

class LocalStorageManipulate {
  constructor(nameLocalStorage) {
    this.nameLocalStorage = nameLocalStorage;
  }

  getLocalStorage() {
    const storage = localStorage.getItem(this.nameLocalStorage);
    if (storage !== null) {
      return JSON.parse(storage);
    } else {
      return null;
    }
  }

  setLocalStorage(obj) {
    localStorage.setItem(this.nameLocalStorage, JSON.stringify(obj));
  }

  deleteLocalStorage() {
    localStorage.removeItem(this.nameLocalStorage);
  }
}
