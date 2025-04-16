/*2025.04.16 18:09 IMM*/

function spy(func) {
  // Массив для хранения всех вызовов
  function wrapper(...args) {
    // Сохраняем аргументы вызова в массиве calls
    wrapper.calls.push(args);

    // Вызываем оригинальную функцию
    return func(...args);
  }

  // Добавляем массив для хранения вызовов на обёртку
  wrapper.calls = [];

  return wrapper;
}

// Пример использования:
function work(a, b) {
  console.log(a + b); // произвольная функция, которая что-то делает с аргументами
}

work = spy(work); // оборачиваем функцию work в spy

work(1, 2); // 3
work(4, 5); // 9

// Выводим все вызовы
for (let args of work.calls) {
  console.log('call:' + args.join()); // "call:1,2", "call:4,5"
}
