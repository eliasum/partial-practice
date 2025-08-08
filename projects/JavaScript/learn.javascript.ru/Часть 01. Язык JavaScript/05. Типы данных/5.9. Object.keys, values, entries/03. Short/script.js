/*2025.08.08 18:07 IMM*/
'use strict';

// # Итерация по объектам: keys, values, entries

// Для перебора свойств объекта в JavaScript существуют три основных метода: 
// `Object.keys()`, `Object.values()` и `Object.entries()`. Эти методы возвращают 
// массив, что делает итерацию по свойствам объекта предсказуемой и удобной. Они работают
// только с **собственными перечисляемыми свойствами** объекта, игнорируя свойства из цепочки прототипов.

// ## 🔥 Object.keys()

// Метод `Object.keys(obj)` возвращает массив, состоящий из строковых ключей объекта.

// 🔥 1.1 - Получение ключей объекта
let user1 = {
  name: "John",
  age: 30,
};

let keys = Object.keys(user1);
console.log(`🔹 1.1.1 - Ключи объекта: ${keys}`); // ["name", "age"]

// 🔥 1.2 - Использование в цикле for...of
for (let key of keys) {
  // console.log(`Ключ: ${key}`);
}

// ## 🔥 Object.values()

// Метод Object.values(obj) возвращает массив, содержащий значения свойств объекта.

// 🔥 2.1 - Получение значений объекта
let user2 = {
  name: "John",
  age: 30,
};

let values = Object.values(user2);
console.log(`🔹 2.1.1 - Значения объекта: ${values}`); // ["John", 30]

// 🔥 2.2 - Суммирование значений
let salaries = {
  John: 100,
  Pete: 300,
  Mary: 250,
};

let sum = 0;
for (let salary of Object.values(salaries)) {
  sum += salary;
}
console.log(`🔹 2.2.1 - Сумма зарплат: ${sum}`); // 650

// ## 🔥 Object.entries()

// Метод Object.entries(obj) возвращает массив массивов, где каждый внутренний массив представляет собой пару [ключ, значение].

// 🔥 3.1 - Получение пар [ключ, значение]
let user3 = {
  name: "John",
  age: 30,
};

let entries = Object.entries(user3);
console.log(`🔹 3.1.1 - Пары ключ/значение: ${entries}`); // [["name", "John"], ["age", 30]]

// 🔥 3.2 - Преобразование объекта в Map
let map = new Map(Object.entries(user3));
console.log(`🔹 3.2.1 - Объект Map: ${map.get("name")}`); // "John"

// ## 💡 Ключевые выводы

// Object.keys(), Object.values(), Object.entries() — современные итераторы, которые возвращают массив.

// Они позволяют легко перебирать свойства объекта с помощью цикла for...of.

// Эти методы создают новый массив, что может быть затратно для очень больших объектов. В таких случаях можно рассмотреть классический for...in с проверкой hasOwnProperty(), если нужна производительность.

// Object.entries() особенно полезен для преобразования объектов в Map.

// ## 🔗 Ресурсы и ссылки

// 📚 Документация: MDN Web Docs - Object.keys()

// 📚 Документация: MDN Web Docs - Object.values()

// 📚 Документация: MDN Web Docs - Object.entries()

// 📖 Дополнительное чтение: learn.javascript.ru - keys, values, entries