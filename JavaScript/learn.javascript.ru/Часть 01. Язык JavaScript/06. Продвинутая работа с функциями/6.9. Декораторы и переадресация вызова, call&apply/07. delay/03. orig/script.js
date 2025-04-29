/*2025.04.29 18:52 IMM*/

/*
Если мы передадим обычную функцию, setTimeout вызовет её без аргументов и с 
this=window (при условии, что код выполняется в браузере).

Мы всё ещё можем передать правильный this, используя промежуточную переменную,
но это немного громоздко:
*/
function delay(f, ms) {

  return function(...args) {
    let savedThis = this; // сохраняем this в промежуточную переменную
    setTimeout(function() {
      f.apply(savedThis, args); // используем её
    }, ms);
  };

}

let f1000 = delay(console.log, 1000);

f1000("test"); // показывает "test" после 1000 мс
