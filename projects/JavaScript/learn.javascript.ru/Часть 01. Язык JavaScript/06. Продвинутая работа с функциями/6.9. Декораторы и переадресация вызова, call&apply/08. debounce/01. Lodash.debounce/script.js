/*2025.04.30 16:21 IMM*/
const _ = require('lodash');  // Подключаем Lodash

let f = _.debounce(console.log, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);