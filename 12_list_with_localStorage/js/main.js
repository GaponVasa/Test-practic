"use strict";
(function(){
	let table = document.querySelector("table");
	let button = document.querySelector(".addNewUsers input[type=\"button\"");
	let divNotFilledField = document.querySelector(".notFilledField");
	let tbody = table.tBodies[0];
	let memory;
	let myData = base.getBase();	

	button.addEventListener("click", addNewUser);
	window.addEventListener("load", function(){//перевіряємо чи існує LocalStorage, якщо так заносимо данні в таблицю
		let localStorageObj = getSetLocalStorage();
		if(localStorageObj){
			let keys = Object.keys(localStorageObj);
			keys.forEach(el => {
				addHtmlToTable(localStorageObj[el].name, localStorageObj[el].email, localStorageObj[el].role)
			});
		};
	});
	table.addEventListener("dblclick", editTable);
	document.body.addEventListener("click", deleteInput);

	function addNewUser(){
		let reg = /([a-zA-Z0-9_.]{1,})((@[a-zA-Z]{2,})[\\\.]([a-zA-Z]{2,3}))/;
		let nameField = document.querySelector(".addNewUsers input[type=\"text\"]");
		let emailField = document.querySelector(".addNewUsers input[type=\"email\"]");
		let select = document.querySelector(".addNewUsers select");
		let selectValue;
		let form = document.querySelector(".addNewUsers form");
		if(divNotFilledField.style.display === "block"){
			divNotFilledField.style.display = "none";
		};
		if(nameField.value === ""){
			notFilledField(nameField);
		}else if(select.value === "select role"){
			notFilledField(select);
		}else if(!reg.test(emailField.value)){
			notFilledField(emailField);
		}else{
			selectValue = select.value.toLowerCase();
			addToTable(nameField.value, emailField.value, selectValue);
			form.reset();
		};
	};

	function notFilledField(field){
		let coordinates = field.getBoundingClientRect();
		let top = divNotFilledField.style.top;
		let left = divNotFilledField.style.left;
		divNotFilledField.style.display = "block";
		if(field.name === "userName" || field.name === "userRole" || field.name === "userEmail"){
			divNotFilledField.style.top = coordinates.bottom + pageYOffset + 9 + "px";
			divNotFilledField.style.left = coordinates.left + coordinates.width/4 + "px";
		};
	};

	class Person{
		constructor(name, email){
			this.name = name;
			this.email = email;
		};
	};

	class Admin extends Person{
		constructor(name, email){
			super(name, email);
			this.role = "admin";
		};
	};

	class User extends Person{
		constructor(name, email){
			super(name, email);
			this.role = "user";
		};
	};

	class Guest extends Person{
		constructor(name, email){
			super(name, email);
			this.role = "guest";
		};
	};

	function createPerson(name, email, role){
		if(role === "admin"){
			return new Admin(name, email);
		}else if(role === "user"){
			return new User(name, email);
		}else if(role === "guest"){
			return new Guest(name, email);
		};
	};
	
	function addToTable(name, email, role){
		let objPerson, returnObj, arrKeys, lastKey;
		objPerson = createPerson(name, email, role);
		console.log("objPerson", objPerson);
		if(localStorage.getItem("myTable")){
			returnObj = getSetLocalStorage();
			arrKeys = Object.keys(returnObj);
			lastKey = parseInt(arrKeys[arrKeys.length - 1]);
			returnObj[lastKey + 1] = objPerson;
			getSetLocalStorage(returnObj);
			console.log("ok if");
		}else{
			returnObj = {};
			returnObj["0"] = objPerson;
			getSetLocalStorage(returnObj);
			console.log("ok else");
		};
		console.log("returnObj", returnObj);
		addHtmlToTable(name, email, role);
	};

	function getSetLocalStorage(obj){
		if(obj){
			localStorage.setItem("myTable", JSON.stringify(obj));
		}else{
			return JSON.parse(localStorage.getItem("myTable"));
		};
	};

	function addHtmlToTable(name, email, role){
		let tbody = table.tBodies[0];
		let html = `<tr><td> ${ name } </td><td> ${ email } </td><td> ${ role } </td></tr>`;
		tbody.innerHTML += html;
	};

	function editTable(event){
		let target = event.target;
		let parent, child, arrText, text;
		if(target.tagName === "TD"){
			text = target.innerText;
			parent = target.parentElement;
			child = parent.childNodes;
			arrText = [];
			child.forEach(el => {
				arrText.push(el.innerText);
			});
			arrText.push(text);
			let arrData = findElement(arrText);
			replacement(arrData, target);
			function outer(){
				function inner(){
					let arr = [arrData, target];
					return arr;
				};
				return inner;
			};
			memory = outer();
		};
	};

	function findElement(arr){
		let returnObj = getSetLocalStorage();
		let arrKeys = Object.keys(returnObj);
		let index, nameElement;
		arrKeys.forEach((el, ind) =>{
			if(returnObj[el].name === arr[0]){
				if(returnObj[el].name === arr[3]){nameElement="name"};
				if(returnObj[el].email === arr[1]){
					if(returnObj[el].email === arr[3]){nameElement="email"};
					if(returnObj[el].role === arr[2]){
						if(returnObj[el].role === arr[3]){nameElement="role"};
						index = ind;
					};
				};
			};
		});
		return [index, nameElement];
	};

	function replacement(arr, targetElement, flag){
		let returnObj = getSetLocalStorage();
		let targetNeme = arr[1];
		let targetNumber = arr[0];
		let text = returnObj[targetNumber][targetNeme];
		let inputText = `<input autofocus type="text" value="${text} ">`;
		let newText;
		if(flag){
			newText = targetElement.firstElementChild.value;
			newText = newText.replace(/ /g,'');
			targetElement.innerHTML = newText;
			return newText;
		}else{
			targetElement.innerHTML = inputText;
		};
	};

	function deleteInput(event){
		let newText;
		if(memory !== undefined){
			let oldMemory = memory();
			let target = event.target;
			if(table.querySelector("input[type=\"text\"]") && target.tagName !== "INPUT"){
				oldMemory = memory();
				newText = replacement(oldMemory[0], oldMemory[1], "ok");
				makeChange(oldMemory, newText);
			};
		};
	};

	function makeChange(memory, newText){
		let returnObj = getSetLocalStorage();
		let key = memory[0][0];
		let name = memory[0][1];
		returnObj[key][name] = newText;
		getSetLocalStorage(returnObj);
	};

	//-------------------Button Delete Local Storage---------------------
	let button1 = document.getElementById("delete");
	button1.addEventListener("click", deleteLocalStorage);
	function deleteLocalStorage(){
		localStorage.removeItem("myTable");
		console.log("Dlete Local Storage");
		tbody.innerHTML = "<tr><th>name</th><th>email</th><th>role</th></tr>";
	};

	//------------------Button Generate Random Local Storage------------
	let button2 = document.getElementById("generate");
	let dataBase,  dataBaseHTML;
	button2.addEventListener("click", generateRandomLocalStorage);

	function generateRandomLocalStorage(){
		let returnObj, arrKeys, lastKey, arrDataBaseKeys;
		dataBase = {};
		dataBaseHTML = "";
		let tbody = table.tBodies[0];
		generateRandomDataBase();
		//перевіряємо чи є в LocalStorage данні, якщо є, то добавляємо за правилом в if
		if(localStorage.getItem("myTable")){
			returnObj = getSetLocalStorage();
			arrKeys = Object.keys(returnObj);
			arrDataBaseKeys = Object.keys(dataBase);
			lastKey = parseInt(arrKeys[arrKeys.length - 1]) + 1;
			arrDataBaseKeys.forEach((el, ind) =>{
				returnObj[lastKey + ind] = dataBase[el];
			});
			getSetLocalStorage(returnObj);
		}else{
			getSetLocalStorage(dataBase);
		};
		tbody.innerHTML += dataBaseHTML;
	};
	

	function generateRandomDataBase(){
		let num = 10;//кількість сворюваних персон
		let random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

		let randomEmail = (obj, numFirstName, numLastName, gender) =>{
			let arrLength;
			let randSecondEmail = obj.eMailSecond[random(0, obj.eMailSecond.length - 1)];
			arrLength = obj.lastName[numLastName].nikname.length;
			let randomNiknameLastName = obj.lastName[numLastName].nikname[random(0, arrLength - 1)];
			let randomNikameFirstName;
			if(gender == "boy"){
				arrLength = obj.boyFirstName[numFirstName].nikname.length;
				randomNikameFirstName = obj.boyFirstName[numFirstName].nikname[random(0, arrLength - 1)];
			}else{
				arrLength = obj.girlFirstName[numFirstName].nikname.length;
				randomNikameFirstName = obj.girlFirstName[numFirstName].nikname[random(0, arrLength - 1)];
			};
			
			switch(random(0, 5)){
				case 0: return randomNikameFirstName + "." + randomNiknameLastName + "@" + randSecondEmail;
				break;
				case 1: return randomNiknameLastName + "." + randomNikameFirstName + "@" + randSecondEmail;
				break;
				case 2: return randomNikameFirstName + "_" + randomNiknameLastName + "@" + randSecondEmail;
				break;
				case 3: return randomNiknameLastName + "_" + randomNikameFirstName + "@" + randSecondEmail;
				break;
				case 4: return randomNikameFirstName + "@" + randSecondEmail;
				break;
				case 5: return randomNiknameLastName + "@" + randSecondEmail;
				break;
			};
		};

		let person = (myObj, gender) => {
			let eMail, name, role;
			let numberFirstName;
			let numberRole = random(0, myObj.role.length - 1);
			role = myObj.role[numberRole];
			let numberLastName = random(0, myObj.lastName.length - 1);
			if(gender == "boy"){
				numberFirstName = random(0, myObj.boyFirstName.length - 1);
				name = myObj.boyFirstName[numberFirstName].name;
			}else{
				numberFirstName = random(0, myObj.girlFirstName.length - 1);
				name = myObj.girlFirstName[numberFirstName].name;
			};
			eMail = randomEmail(myObj, numberFirstName, numberLastName, gender);
			return [name, eMail, role];
		};

		let boyOrGirl = random(1, 7);
		let dataArr;
		for(let i = 1; i <= num; i++){
			if(boyOrGirl >= 4){
				dataArr = person(myData, "boy");
			}else{
				dataArr = person(myData, "girl");
			};
			dataBase[i - 1] = createPerson(dataArr[0], dataArr[1], dataArr[2]);
			dataBaseHTML += `<tr><td> ${ dataArr[0] } </td><td> ${ dataArr[1] } </td><td> ${ dataArr[2] } </td></tr>`;
 			boyOrGirl = random(1, 7);
		};
	};
	
	//------------------Button To display Local Storage-----------------
	let button3 = document.getElementById("toDisplay");
	button3.addEventListener("click", toDisplayLocalStorage);
	function toDisplayLocalStorage(){
		let obj = JSON.parse(localStorage.getItem("myTable"));
		if(obj === null){
			console.log("Local Storage not created");
		}else{
			console.log("Get Local Storage", obj);
		};
	};
})();