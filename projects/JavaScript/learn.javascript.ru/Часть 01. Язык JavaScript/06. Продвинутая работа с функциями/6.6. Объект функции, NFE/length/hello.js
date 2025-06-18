/*2024.05.15 16:46 IMM*/

function ask(question, ...handlers) {
    
    let isYes = confirm(question);
	 
    for(let handler of handlers) {
		
		alert('handler.length == '+handler.length);		//my
        
        if (handler.length == 0) {
            if (isYes) handler();
        } else {
            handler(isYes);
        }
    }
}

// для положительных ответов вызываются оба типа обработчиков
// для отрицательных - только второго типа
ask("Вопрос?", () => alert('Вы ответили да'), result => alert(result));