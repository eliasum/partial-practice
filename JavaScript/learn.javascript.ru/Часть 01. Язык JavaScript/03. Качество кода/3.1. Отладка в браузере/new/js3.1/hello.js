function hello(name){
	let phrase = `Hello, ${name}!`;
	debugger;
	say(phrase);
}

function say(phrase){
	alert(`** ${phrase} **`);
}

hello("Иван");