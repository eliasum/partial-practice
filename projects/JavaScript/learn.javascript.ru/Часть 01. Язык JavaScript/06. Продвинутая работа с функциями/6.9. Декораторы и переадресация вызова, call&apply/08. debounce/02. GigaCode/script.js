/*2025.05.19 12:09 IMM*/

// f теперь — обёрнутая версия console.log, которая будет вызываться только один раз, спустя 1000 мс после последнего вызова
let f = debounce(console.log, 1000);

f("a"); // вызван сразу
setTimeout(() => f("b"), 200); // через 200 мс
setTimeout(() => f("c"), 500); // через 500 мс

function debounce(f, ms) {
  // timer — переменная внутри замыкания (не "забывается" между вызовами).
  let timer = null; // здесь будет храниться идентификатор таймера

  return function(...args) {
    const onComplete = () => {
      f.apply(this, args); // вызываем f с переданными аргументами и текущим контекстом
      timer = null; // сбрасываем таймер
    }

    if (timer) {
      // отменяет предыдущий вызов, если debounced-функция была вызвана раньше, чем прошёл ms
      clearTimeout(timer); // если таймер уже есть — сбрасываем
    }

    // вызовет f через ms миллисекунд, если вызов не был прерван
    timer = setTimeout(onComplete, ms); // ставим новый таймер
  };
}

// Каждый вызов сбрасывает предыдущий таймер.
// Только последний вызов, если не был прерван, приведёт к выполнению функции.
