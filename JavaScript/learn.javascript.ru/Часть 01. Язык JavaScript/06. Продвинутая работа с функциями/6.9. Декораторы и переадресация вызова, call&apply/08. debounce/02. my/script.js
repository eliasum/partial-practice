/*2025.04.30 16:21 IMM*/

let f = debounce(console.log, 1000);

f("a");
setTimeout( () => f("b"), 200);
setTimeout( () => f("c"), 500);

function debounce(f, ms) {

    return function() {
      setTimeout(() => f.apply(this, arguments), ms);
    };
  
  }