"use strict";
//Объект данных для создания базы
console.log("myData");

const randomUsersData = {
  role: ["admin", "user", "guest"],
  boyFirstName: [
    {
      name: "Василь",
      nikname: ["vas", "vasa", "Vasyl"],
    },
    {
      name: "Іван",
      nikname: ["ivan", "Iv", "iivan"],
    },
    {
      name: "Микола",
      nikname: ["Nik", "nikolay", "Mykola"],
    },
    {
      name: "Петро",
      nikname: ["petr", "pr", "Piter"],
    },
    {
      name: "Сергій",
      nikname: ["Serg", "ser", "sergiy"],
    },
    {
      name: "Дмитро",
      nikname: ["Dmitr", "DimDim", "Dmitro"],
    },
    {
      name: "В'ячеслав",
      nikname: ["Vjacheslav", "vjv", "Slavik"],
    },
    {
      name: "Владислав",
      nikname: ["Vlad", "Vladislav", "vld"],
    },
    {
      name: "Олександр",
      nikname: ["Alex", "Oleksandr", "Alexander"],
    },
    {
      name: "Михаило",
      nikname: ["Mihas", "Mihail", "MiH"],
    },
    {
      name: "Юрій",
      nikname: ["Yuriy", "YY", "Yiy"],
    },
    {
      name: "Андрій",
      nikname: ["Andre", "Andr", "adr"],
    },
    {
      name: "Кузьма",
      nikname: ["Kuzma", "kuzja", "kz"],
    },
    {
      name: "Артем",
      nikname: ["Artem", "ART", "at"],
    },
    {
      name: "Тимофій",
      nikname: ["Timofey", "TimTim", "tmf"],
    },
    {
      name: "Микита",
      nikname: ["miki", "Nikita", "Mikita"],
    },
    {
      name: "Йосиф",
      nikname: ["Iosif", "IO", "IoS"],
    },
    {
      name: "Эфрем",
      nikname: ["Efrem", "EF", "efr"],
    },
    {
      name: "Аркадій",
      nikname: ["Arkadiy", "ark", "Arkad"],
    },
  ],
  girlFirstName: [
    {
      name: "Наталія",
      nikname: ["nata", "Natasha", "Natalja"],
    },
    {
      name: "Юлія",
      nikname: ["Iyulija", "Yula", "bulka"],
    },
    {
      name: "Ольга",
      nikname: ["Olga", "Volka", "olg"],
    },
    {
      name: "Світлана",
      nikname: ["sv", "Sveta", "Svetlana"],
    },
    {
      name: "Людмила",
      nikname: ["Luda", "Ludmila", "ldla"],
    },
    {
      name: "Уляна",
      nikname: ["Ulja", "Uljana", "ul"],
    },
    {
      name: "Катерина",
      nikname: ["katja", "Ekaterina", "Katrusja"],
    },
    {
      name: "Тетяна",
      nikname: ["Tatjana", "tat", "TT"],
    },
    {
      name: "Оксана",
      nikname: ["Oksana", "oks", "ksusha"],
    },
    {
      name: "Лідія  ",
      nikname: ["Lida", "Lidija", "lD"],
    },
    {
      name: "Тамара",
      nikname: ["Tamara", "TM", "tomushok"],
    },
    {
      name: "Алла",
      nikname: ["Alla", "AA", "Al"],
    },
    {
      name: "Варвара",
      nikname: ["Varvara", "Varja", "Barbara"],
    },
    {
      name: "Віра",
      nikname: ["Vera", "verka", "vrk"],
    },
    {
      name: "Еріка",
      nikname: ["Erika", "erk", "erika"],
    },
    {
      name: "Марта",
      nikname: ["Marta", "mrt"],
    },
    {
      name: "Софія",
      nikname: ["Sofija", "Sofa", "sfj"],
    },
    {
      name: "Христина",
      nikname: ["Hristina", "Hristja", "hrst"],
    },
    {
      name: "Ярославна",
      nikname: ["Jaroslavna", "jarika", "JRNa"],
    },
  ],
  lastName: [
    {
      name: "Петрухненко",
      nikname: ["Petruhnenko", "petruhn"],
    },
    {
      name: "Іваненко",
      nikname: ["Ivanenko", "ivanko"],
    },
    {
      name: "Петренко",
      nikname: ["Petrenko", "petrenko"],
    },
    {
      name: "Нечитайло",
      nikname: ["Netchitaylo", "nech"],
    },
    {
      name: "Гупало",
      nikname: ["Gupalo", "gup"],
    },
    {
      name: "Прасол",
      nikname: ["Prasol", "pras"],
    },
    {
      name: "Сидоренко",
      nikname: ["Sidorenko", "sidorko"],
    },
    {
      name: "Перебийнос",
      nikname: ["Perebiynos", "perbiyn"],
    },
    {
      name: "Водолазкий",
      nikname: ["Vodolazkiy", "vodolaz"],
    },
    {
      name: "Клубук",
      nikname: ["Klubuk", "klub"],
    },
    {
      name: "Данилко",
      nikname: ["Danilko", "danko"],
    },
    {
      name: "Андрієв",
      nikname: ["Andrijev", "andre"],
    },
    {
      name: "Палійчук",
      nikname: ["Palijchuk", "paliy", "pal"],
    },
    {
      name: "Лесін",
      nikname: ["Lesin", "LES", "lis"],
    },
    {
      name: "Яровий",
      nikname: ["Jaroviy", "jar", "JaRik"],
    },
    {
      name: "Малиш",
      nikname: ["Malish", "mal", "small"],
    },
    {
      name: "Мерцало",
      nikname: ["Merzalo", "merz"],
    },
    {
      name: "Сикорин",
      nikname: ["Sikorin", "sikor"],
    },
    {
      name: "Адаменко",
      nikname: ["Adamenko", "adam"],
    },
    {
      name: "Остапчук",
      nikname: ["Ostapchuck", "ostap"],
    },
    {
      name: "Самойлович",
      nikname: ["Samojlovich", "sem"],
    },
  ],
  eMailSecond: [
    "google.com",
    "ukr.net",
    "ukrpost.net",
    "ua.fm",
    "yahoo.com",
    "online.ua",
    "i.ua",
    "meta.ua",
    "hotmail.com",
  ],
};
