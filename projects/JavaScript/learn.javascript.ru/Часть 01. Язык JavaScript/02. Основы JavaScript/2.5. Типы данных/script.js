/*2025.07.08 10:51 IMM*/
'use strict';

// 🔹 Краткое содержание статьи «Типы данных»:

//     Примитивные типы данных в JavaScript:

//         number — целые и дробные числа, включая Infinity, -Infinity и NaN.

//         bigint — для очень больших целых чисел (добавляется суффикс n, например 123n).

//         string — строки (можно использовать '', "" или ` для шаблонных строк).

//         boolean — true или false.

//         null — специальное значение «ничего».

//         undefined — значение по умолчанию для неинициализированных переменных.

//         symbol — уникальные идентификаторы (редко используются).

//     Оператор typeof:

//         Позволяет проверить тип переменной.

//         Возвращает строку, например:

    console.log(typeof 42);          // "number"
    console.log(typeof "hello");     // "string"
    console.log(typeof true);        // "boolean"
    console.log(typeof undefined);   // "undefined"
    console.log(typeof null);        // "object" (историческая ошибка в JS!)

// Особенности null и undefined:

//     null означает «значение отсутствует», а undefined — «переменная не присвоена».

//     typeof null возвращает "object" — это баг в JS, который нельзя исправить из-за обратной совместимости.

// Преобразование типов:

//     JavaScript слабо типизирован, поэтому значения могут автоматически преобразовываться (например, "5" + 1 = "51", но "5" - 1 = 4).

// 🔥 1. Особенности typeof

// Оператор typeof x возвращает строку с типом значения. Но есть несколько неочевидных моментов:
console.log(`🔹 1.1. typeof null === "object" - ${typeof null === "object"}`); // true (баг в JS)

// Это ошибка в языке, сохранившаяся для совместимости.
// На самом деле null — это отдельный тип, но в ранних версиях JS его сделали объектом, и теперь нельзя исправить.

// 🔹 1.2. typeof function() {} === "function"
console.log(`🔹 1.2. typeof function() {} === "function" - ${typeof function() {} === "function"}`);

// Функции — это объекты, но typeof выделяет их отдельно:

console.log(`typeof console.log - ${typeof console.log}`);
console.log(`typeof {} - ${typeof {}}`);

// 🔹 1.3. typeof для необъявленных переменных

// Если переменная не объявлена, typeof вернёт "undefined", а не вызовет ошибку:

console.log(`typeof someUnknownVar - ${typeof someUnknownVar}`); // "undefined" (без ReferenceError)

// 🔥 2. Нюансы приведения типов

// JavaScript автоматически преобразует типы в некоторых операциях.
console.log('\n🔹 2.1. - Строковое преобразование');

// Происходит, когда нужно получить строку:

//     При сложении со строкой (+).

//     В console.log().

let x = true;
console.log(`🔹 2.1.1. - ${x + ""}`); // "true" (автоматически в строку)
console.log(`🔹 2.1.2. - ${"5" + 1}`); // "51"

// 🔹 2.2. Численное преобразование (Number(x))
console.log('\n🔹 2.2. - Численное преобразование');

// Происходит в математических операциях (кроме +, если есть строка):

console.log(`🔹 2.2.1. - ${"10" - 2}`); // 8
console.log(`🔹 2.2.2. - ${"10" / "2"}`); // 5
console.log(`🔹 2.2.3. - ${+"5"}`); // 5

// Особые случаи:
console.log('\n🔹 2.2.4. - Особые случаи Number():');
console.log(`🔹 2.2.4.1. - ${Number(undefined)}`); // NaN
console.log(`🔹 2.2.4.2. - ${Number(null)}`); // 0
console.log(`🔹 2.2.4.3. - ${Number("")}`); // 0

// 🔹 2.3. Логическое преобразование (Boolean(x))

// Происходит в условиях (if, while, !!x).
// Ложные (falsy) значения (станут false):

console.log('\n🔹 2.3. - Логическое преобразование');
console.log('Falsy значения:');
console.log(`🔹 2.3.1. - ${Boolean(0)}`); // false
console.log(`🔹 2.3.2. - ${Boolean("")}`); // false
console.log(`🔹 2.3.3. - ${Boolean(null)}`); // false
console.log(`🔹 2.3.4. - ${Boolean(undefined)}`); // false

// Все остальные значения — true:

console.log('\nTruthy значения:');
console.log(`🔹 2.3.5. - ${Boolean("0")}`); // true
console.log(`🔹 2.3.6. - ${Boolean(" ")}`); // true
console.log(`🔹 2.3.7. - ${Boolean([])}`); // true
console.log(`🔹 2.3.8. - ${Boolean({})}`); // true

// 🔥 3. Неочевидные примеры
// 🔹 3.1. Сложение массивов и объектов

console.log('\n🔹 3.1. - Сложение массивов и объектов');
console.log(`🔹 3.1.1. - ${[] + []}`); // ""
console.log(`🔹 3.1.2. - ${{} + []}`); // "[object Object]"

// 🔹 3.2. Сравнение разных типов

// При == JS приводит типы:

console.log('\n🔹 3.2. - Сравнение разных типов');
console.log(`🔹 3.2.1. - ${"0" == 0}`); // true
console.log(`🔹 3.2.2. - ${0 == false}`); // true
console.log(`🔹 3.2.3. - ${"" == 0}`); // true
console.log(`🔹 3.2.4. - ${null == undefined}`); // true

// Но === не преобразует типы:
console.log(`🔹 3.2.5. - ${"0" === 0}`); // false

// 🔥 Вывод: что запомнить?

// ✅ typeof null === "object" — баг JS.
// ✅ undefined → NaN в числах, false в логическом контексте.
// ✅ null → 0 в числах, false в логическом контексте.
// ✅ + со строкой преобразует всё в строки, остальные математические операторы — в числа.
// ✅ == делает приведение типов, === — нет.

// 🔍 Почему typeof alert возвращает "function", а не "object"?

/*
  Функции — это «объекты + вызываемость»
  - Функции действительно являются объектами (у них есть свойства, методы, прототипы)
  - Но у них есть внутренний метод [[Call]], который делает их вызываемыми
  - typeof специально возвращает "function" для удобства проверки
*/

// Примеры:
function foo() {}
const obj = {};

console.log(`🔹 4.1. - ${typeof foo}`);  // "function"
console.log(`🔹 4.2. - ${typeof obj}`);  // "object"
console.log(`🔹 4.3. - ${foo instanceof Object}`); // true (функция - это объект)

// 🔍 А что с {}?
/*
  {} — обычный объект без [[Call]], 
  поэтому typeof возвращает "object"
*/
console.log(`🔹 5.1. - ${typeof {}}`); // "object"

// ❓ Почему не сделали typeof [] === "array"?
/*
  Массивы — тоже объекты, но для них нет отдельного типа в typeof
  Для проверки используйте Array.isArray()
*/
const arr = [];
console.log(`🔹 6.1. - ${typeof arr}`); // "object"
console.log(`🔹 6.2. - ${Array.isArray(arr)}`); // true

// 🔍 Историческая причина
/*
  В ранних версиях JS функции были единственными вызываемыми сущностями,
  поэтому их выделили в отдельный тип
*/
console.log(`🔹 7.1. - ${typeof class {}}`); // "function" (классы тоже функции)

// ПРИМЕР

// 🔹 Пример 1: Подстановка числа в шаблонную строку
/*
Что происходит:
- ${1} — число 1
- Число автоматически преобразуется в строку "1"
- Результат: конкатенация строк
*/
console.log(`hello ${1}`); // "hello 1"

// 🔹 Пример 2: Подстановка строкового литерала
/*
Что происходит:
- ${"name"} — строка "name" (не переменная)
- Подставляется как есть без преобразований
*/
console.log(`hello ${"name"}`); // "hello name"

// 🔹 Пример 3: Подстановка переменной
const name = "Ilya"; // Объявляем переменную
/*
Что происходит:
- ${name} — значение переменной "Ilya"
- Подставляется содержимое переменной
*/
console.log(`hello ${name}`); // "hello Ilya"

// 📌 Итоговые выводы:
/*
В ${...} можно подставлять:
1. Переменные — ${variable}
2. Числа — ${100} → "100"
3. Строковые литералы — ${"text"}
4. Выражения — ${2 + 3} → "5"
*/

// 💡 Дополнительные примеры:

// С выражениями:
console.log(`hello ${"na" + "me"}`); // "hello name"

// С объектами:
console.log(`hello ${{}}`); // "hello [object Object]"

// С функциями:
console.log(`hello ${(() => "world")()}`); // "hello world"
console.log(`hello ${(() => "world")}`); // "hello () => "world""

// Переносы строк сохраняются:
console.log(`hello
${name}`); 
/* Выведет:
hello
Ilya
*/

// ❌ Ошибка при использовании необъявленной переменной
// console.log(`hello ${undefinedVar}`); // ReferenceError: undefinedVar is not defined