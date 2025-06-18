function hello(name) {
  let phrase = `Hello, ${name}!`;

  debugger;  // <-- здесь выполнение прерывается

  say(phrase);
}

function say(phrase) {
  alert(`** ${phrase} **`);
}
