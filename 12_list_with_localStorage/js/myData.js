"use strict";
//Объект данных для создания базы
console.log("myData");
let base = (function(){
	let myData = {
		role:["admin", "user", "guest"],
		boyFirstName:[
			{
				name:"Василий", 
			 	nikname:["vas", "vasa", "Vasyl"]
			},
			{
				name:"Иван",
				nikname:["ivan", "Iv", "iivan"]
			},
			{
				name:"Николай",
				nikname:["Nik", "nikolay", "Mykola"]
			},
			{
				name: "Петр",
				nikname:["petr", "pr", "Piter"]
			},
			{
				name: "Сергей",
				nikname:["Serg", "ser", "sergiy"]
			},
			{
				name: "Дмитрий",
				nikname:["Dmitr", "DimDim", "Dmitro"]
			},
			{
				name: "Вячеслав",
				nikname:["Vjacheslav", "vjv", "Slavik"]
			},
			{
				name: "Владислав",
				nikname:["Vlad", "Vladislav", "vld"]
			},
			{
				name: "Александр",
				nikname:["Alex", "Oleksandr", "Alexander"]
			},
			{
				name: "Михаил",
				nikname:["Mihas", "Mihail", "MiH"]
			},
			{
				name: "Юрий",
				nikname:["Yuriy", "YY", "Yiy"]
			},
			{
				name: "Андрей",
				nikname:["Andre", "Andr", "adr"]
			},
			{
				name: "Кузьма",
				nikname:["Kuzma", "kuzja", "kz"]
			},
			{
				name: "Артём",
				nikname:["Artem", "ART", "at"]
			},
			{
				name: "Тимофей",
				nikname:["Timofey", "TimTim", "tmf"]
			},
			{
				name: "Микита",
				nikname:["miki", "Nikita", "Mikita"]
			},
			{
				name: "Иосиф",
				nikname:["Iosif", "IO", "IoS"]
			},
			{
				name: "Эфрем",
				nikname:["Efrem", "EF", "efr"]
			},
			{
				name: "Аркадий",
				nikname:["Arkadiy", "ark", "Arkad"]
			}
		],
		girlFirstName:[
			{
				name: "Наталья",
				nikname:["nata", "Natasha", "Natalja"]
			},
			{
				name: "Юлия",
				nikname:["Iyulija", "Yula", "bulka"]
			},
			{
				name: "Ольга",
				nikname:["Olga", "Volka", "olg"]
			},
			{
				name: "Светлана",
				nikname:["sv", "Sveta", "Svetlana"]
			},
			{
				name: "Людмила",
				nikname:["Luda", "Ludmila", "ldla"]
			},
			{
				name: "Уляна",
				nikname:["Ulja", "Uljana", "ul"]
			},
			{
				name: "Екатерина",
				nikname:["katja", "Ekaterina", "Katrusja"]
			},
			{
				name: "Татьяна",
				nikname:["Tatjana", "tat", "TT"]
			},
			{
				name: "Оксана",
				nikname:["Oksana", "oks", "ksusha"]
			},
			{
				name: "Лидия",
				nikname:["Lida", "Lidija", "lD"]
			},
			{
				name: "Тамара",
				nikname:["Tamara", "TM", "tomushok"]
			},
			{
				name: "Алла",
				nikname:["Alla", "AA", "Al"]
			},
			{
				name: "Варвара",
				nikname:["Varvara", "Varja", "Barbara"]
			},
			{
				name: "Вера",
				nikname:["Vera", "verka", "vrk"]
			},
			{
				name: "Эрика",
				nikname:["Erika", "erk", "erika"]
			},
			{
				name: "Марта",
				nikname:["Marta", "mrt"]
			},
			{
				name: "София",
				nikname:["Sofija", "Sofa", "sfj"]
			},
			{
				name: "Христина",
				nikname:["Hristina", "Hristja", "hrst"]
			},
			{
				name: "Ярославна",
				nikname:["Jaroslavna", "jarika", "JRNa"]
			}
		],
		lastName:[
			{
				name: "Петрухненко",
				nikname:["Petruhnenko", "petruhn"]
			},
			{
				name: "Иваненко",
				nikname:["Ivanenko", "ivanko"]
			},
			{
				name: "Петренко",
				nikname:["Petrenko", "petrenko"]
			},
			{
				name: "Нечитайло",
				nikname:["Netchitaylo", "nech"]
			},
			{
				name: "Гупало",
				nikname:["Gupalo", "gup"]
			},
			{
				name: "Прасол",
				nikname:["Prasol", "pras"]
			},
			{
				name: "Сидоренко",
				nikname:["Sidorenko", "sidorko"]
			},
			{
				name: "Перебийнос",
				nikname:["Perebiynos", "perbiyn"]
			},
			{
				name: "Водолазкий",
				nikname:["Vodolazkiy", "vodolaz"]
			},
			{
				name: "Клубук",
				nikname:["Klubuk", "klub"]
			},
			{
				name: "Данилко",
				nikname:["Danilko", "danko"]
			},
			{
				name: "Андреєв",
				nikname:["Andrejev", "andre"]
			},
			{
				name: "Палийчук",
				nikname:["Plijchuk", "paliy", "pal"]
			},
			{
				name: "Лесин",
				nikname:["Lesin", "LES", "lis"]
			},
			{
				name: "Яровой",
				nikname:["Jarovoj", "jar", "JaRik"]
			},
			{
				name: "Малыш",
				nikname:["Malish", "mal", "small"]
			},
			{
				name: "Мерцало",
				nikname:["Merzalo", "merz"]
			},
			{
				name: "Сикорин",
				nikname:["Sikorin", "sikor"]
			},
			{
				name: "Адаменко",
				nikname:["Adamenko", "adam"]
			},
			{
				name: "Остапчук",
				nikname:["Ostapchuck", "ostap"]
			},
			{
				name: "Самойлович",
				nikname:["Samojlovich", "sem"]
			}
		],
		eMailSecond:["google.com", "ukr.net", "ukrpost.net", "ua.fm", "yahoo.com", "online.ua", "i.ua", "meta.ua", "hotmail.com"]
	};

	function get(){
		return myData;
	};
	return {getBase: get};
})();
