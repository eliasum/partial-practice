/*2025.05.19 18:43 IMM*/

/*
🔧 Цель:
Сделать декоратор throttle(f, ms), который:
Сразу вызывает f при первом вызове.
Блокирует повторные вызовы в течение ms миллисекунд.
После завершения паузы вызывает f ещё раз, если были попытки вызова.
*/

function throttle(func, ms) {
  let isThrottled = false; // 🔒 флаг — можно ли вызывать func?
  let savedArgs;           // 📦 переменная для сохранения аргументов
  let savedThis;           // 📦 переменная для сохранения контекста

  return function(...args) {
    if (isThrottled) {  
      savedArgs = args;    // Сохраняем аргументы
      savedThis = this;    // Сохраняем контекст
      return;              // Пропускаем вызов
    }

    func.apply(this, args);   // Выполняем функцию сразу
    isThrottled = true;       // Включаем блокировку

    setTimeout(() => {
      isThrottled = false;    // Сбрасываем блокировку через ms

      if (savedArgs) {        // Если были сохранены аргументы
        func.apply(savedThis, savedArgs);  // Вызовем с последними данными
        savedArgs = savedThis = null; // Сбросим сохранённые данные
      }
    }, ms);
  };
}

function log(a) {
  console.log(a);
}

let f = throttle(console.log, 1000);

f(1); // ✅ выведет 1
f(2); // ❌ сохраняет 2
f(3); // ❌ сохраняет 3

// через 1000 мс снова вызываем, и выводим 3
setTimeout(() => f(4), 1100); // ✅ выведет 4
