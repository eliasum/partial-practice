// Получаем текущую дату и время

const currentDateTime = new Date();

 

// Функция для добавления ведущего нуля, если число меньше 10

function addLeadingZero(num) {
    return num < 10 ? `0${num}` : num;

}

 

// Форматируем месяц с добавлением ведущего нуля

const formattedMonth = addLeadingZero(currentDateTime.getMonth() + 1); // +1, так как месяцы в JavaScript отсчитываются с нуля

 

// Форматируем день с добавлением ведущего нуля

const formattedDay = addLeadingZero(currentDateTime.getDate());

 

// Форматируем дату и время в нужный формат

const formattedDateTime = (`${currentDateTime.getFullYear()}.`+formattedMonth+`.`+formattedDay+` ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}`);

 

// Создаем временный элемент textarea в документе

const tempTextArea = document.createElement('textarea');

tempTextArea.value = formattedDateTime;

 

// Добавляем временный элемент в body

document.body.appendChild(tempTextArea);

 

// Выделяем текст в элементе и копируем его в буфер обмена

tempTextArea.select();

document.execCommand('copy');

 

// Удаляем временный элемент из документа

document.body.removeChild(tempTextArea);

 

console.log(`/*${formattedDateTime} IMM*/`);