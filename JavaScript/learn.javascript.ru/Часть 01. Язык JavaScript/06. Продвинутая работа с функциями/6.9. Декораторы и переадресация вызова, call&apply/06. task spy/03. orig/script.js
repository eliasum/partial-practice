/*2025.04.17 17:50 IMM*/

//Обертка, возвращаемая spy(f), должна хранить все аргументы, и затем использовать f.apply для переадресации вызова.
function spy(func) {

  function wrapper(...args) {
    // мы используем ...args вместо arguments для хранения "реального" массива в wrapper.calls
    wrapper.calls.push(args);
    return func.apply(this, args);
  }

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
