/*2025.07.08 12:09 IMM*/
'use strict';

// 🔥 1. Основные типы преобразований

// ✔ 1.1. Строковое преобразование (String(x))
/*
Используется, когда нужно явно преобразовать значение в строку:
- При конкатенации со строками
- При выводе в консоль
- При явном вызове String()
*/
console.log(`🔹 1.1.1 - ${String(42)}`);        // "42" (число → строка)
console.log(`🔹 1.1.2 - ${String(true)}`);       // "true" (булево → строка)  
console.log(`🔹 1.1.3 - ${String(null)}`);       // "null" (null → строка)
console.log(`🔹 1.1.4 - ${String({name: 'John'})}`); // "[object Object]" (объект → строка)

// Особенности преобразования массивов
console.log(`🔹 1.1.5 - ${[1, 2, 3] + ""}`);    // "1,2,3" (массив → строка через запятую)

// ✔ 1.2. Численное преобразование (Number(x))
/*
Применяется в математических операциях:
- При использовании унарного плюса
- В арифметических операциях (-, *, /)
- При сравнениях (> , <)
*/
console.log(`🔹 1.2.1 - ${Number("100")}`);      // 100 (строка → число)
console.log(`🔹 1.2.2 - ${Number(" ")}`);        // 0 (пробел → 0)
console.log(`🔹 1.2.3 - ${Number("")}`);         // 0 (пустая строка → 0)
console.log(`🔹 1.2.4 - ${Number(false)}`);      // 0 (false → 0)
console.log(`🔹 1.2.5 - ${Number(true)}`);       // 1 (true → 1)
console.log(`🔹 1.2.6 - ${Number(null)}`);       // 0 (null → 0)
console.log(`🔹 1.2.7 - ${Number(undefined)}`);  // NaN (undefined → NaN)

// Проблемные случаи преобразования
console.log(`🔹 1.2.8 - ${+"12px"}`);           // NaN (некорректное число)
console.log(`🔹 1.2.9 - ${Number("abc123")}`);   // NaN (некорректное число)

// ✔ 1.3. Логическое преобразование (Boolean(x))
/*
Используется в условиях и логических операциях:
- В if/else условиях
- При использовании логических операторов (||, &&, !)
*/
// Falsy-значения (преобразуются в false)
console.log(`🔹 1.3.1 - ${Boolean(0)}`);         // false
console.log(`🔹 1.3.2 - ${Boolean("")}`);        // false (пустая строка)
console.log(`🔹 1.3.3 - ${Boolean(null)}`);      // false
console.log(`🔹 1.3.4 - ${Boolean(undefined)}`);  // false
console.log(`🔹 1.3.5 - ${Boolean(NaN)}`);       // false

// Truthy-значения (преобразуются в true)
console.log(`🔹 1.3.6 - ${Boolean("0")}`);       // true (непустая строка)
console.log(`🔹 1.3.7 - ${Boolean(" ")}`);       // true (пробел)
console.log(`🔹 1.3.8 - ${Boolean([])}`);        // true (пустой массив)
console.log(`🔹 1.3.9 - ${Boolean({})}`);        // true (пустой объект)

// 🔥 2. Неявные преобразования типов

// ✔ 2.1. Арифметические операторы
console.log(`🔹 2.1.1 - ${"50" + 5}`);          // "505" (конкатенация строк)
console.log(`🔹 2.1.2 - ${"50" - 5}`);          // 45 (преобразование в число)
console.log(`🔹 2.1.3 - ${"10" * "2"}`);        // 20 (преобразование в число)
console.log(`🔹 2.1.4 - ${"10" / "2"}`);        // 5 (преобразование в число)

// ✔ 2.2. Сравнение значений (== vs ===)
console.log(`🔹 2.2.1 - ${"5" == 5}`);          // true (нестрогое сравнение)
console.log(`🔹 2.2.2 - ${"" == false}`);       // true (оба → 0)
console.log(`🔹 2.2.3 - ${null == undefined}`); // true (специальное правило)
console.log(`🔹 2.2.4 - ${"5" === 5}`);         // false (строгое сравнение)

// 🔥 3. Полезные приёмы работы

// ✔ 3.1. Быстрое преобразование в число
console.log(`🔹 3.1.1 - ${+"150"}`);            // 150 (унарный плюс)
console.log(`🔹 3.1.2 - ${parseInt("100px")}`);  // 100 (извлечение числа)
console.log(`🔹 3.1.3 - ${parseFloat("12.5em")}`);// 12.5 (извлечение числа)

// ✔ 3.2. Проверка на NaN
console.log(`🔹 3.2.1 - ${isNaN(NaN)}`);        // true (глобальная проверка)
console.log(`🔹 3.2.2 - ${isNaN("текст")}`);    // true (опасное поведение)
console.log(`🔹 3.2.3 - ${Number.isNaN(NaN)}`); // true (строгая проверка)
console.log(`🔹 3.2.4 - ${Number.isNaN("текст")}`);// false (без преобразования)

// ✔ 3.3. Явное приведение типов
const userInput = "some value";
console.log(`🔹 3.3.1 - ${Boolean(userInput)}`); // true (явное преобразование)
console.log(`🔹 3.3.2 - ${String(userInput)}`);  // "some value" (явное преобразование)

// 🔥 4. Boolean(x) vs !!x — что читаемее?

/*
  ✔ 4.1. Как работает !!x?
  Двойное отрицание преобразует значение в boolean:
  1. Первый ! конвертирует в boolean и инвертирует
  2. Второй ! возвращает исходное булево значение
*/
console.log(`🔹 4.1.1 - ${!!"hello"}`); // true (непустая строка = true)
console.log(`🔹 4.1.2 - ${!!0}`);       // false (0 = false)

// Разбор преобразований:
console.log(`🔹 4.1.3 - ${!"hello"}`);  // false (инверсия true)
console.log(`🔹 4.1.4 - ${!false}`);     // true (инверсия false)

/*
  ✔ 4.2. Boolean(x) — явное преобразование
  Более читаемая альтернатива !!x
*/
console.log(`🔹 4.2.1 - ${Boolean("hello")}`); // true
console.log(`🔹 4.2.2 - ${Boolean(0)}`);      // false

// 🔥 5. Проверка на NaN

/*
  ✔ 5.1. Глобальная isNaN()
  ВНИМАНИЕ: Сначала пытается преобразовать аргумент в число!
  - "строка" → NaN при преобразовании → true
  - "123" → 123 при преобразовании → false
*/
console.log(`🔹 5.1.1 - ${isNaN("строка")}`); // true (т.к. Number("строка") = NaN)
console.log(`🔹 5.1.2 - ${isNaN("123")}`);    // false (т.к. Number("123") = 123)

/*
  ✔ 5.2. Number.isNaN()
  Проверяет ТОЛЬКО настоящие NaN, без преобразований:
  - Принимает только числа
  - Для нечисел всегда возвращает false
*/
console.log(`🔹 5.2.1 - ${Number.isNaN("строка")}`); // false (строка ≠ NaN)
console.log(`🔹 5.2.2 - ${Number.isNaN(NaN)}`);     // true
console.log(`🔹 5.2.3 - ${Number.isNaN(0/0)}`);     // true (0/0 = NaN)

/*
  💡 Практическое применение:
  Как правильно проверять ввод пользователя
*/
const userInput2 = "123abc";
console.log(`🔹 5.3.1 - ${Number.isNaN(Number(userInput2))}`); // true (некорректное число)
console.log(`🔹 5.3.2 - ${!Number.isFinite(Number(userInput2))}`); // true (альтернативный способ)

/*
  💡 Важные нюансы:
  - Boolean(" ") = true (пробел не пустая строка)
  - Number.isNaN(undefined) = false (хотя Number(undefined) = NaN)
*/
console.log(`🔹 5.4.1 - ${Boolean(" ")}`);      // true
console.log(`🔹 5.4.2 - ${Number.isNaN(undefined)}`); // false
console.log(`🔹 5.4.3 - ${Number(undefined)}`); // NaN

/*
  📌 Рекомендации:
  Всегда используйте Boolean(x) вместо !!x для ясности
  Для проверки NaN используйте только Number.isNaN()
*/
const value = "текст";
if (Number.isNaN(Number(value))) {
  console.log("🔹 5.5.1 - Ошибка: введено не число");
}

const emptyValue = "";
console.log(`🔹 5.5.2 - ${Boolean(emptyValue)}`); // false
console.log(`🔹 5.5.3 - ${!!emptyValue}`);       // false (работает, но менее читаемо)