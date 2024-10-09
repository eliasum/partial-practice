/*2024.03.20 16:52 IMM*/

// Получаем текущую дату и время

const currentDateTime = new Date();

 

// Функция для добавления ведущего нуля, если число меньше 10

function addLeadingZero(num) {

    return num < 10 ? `0${num}` : num;

}

 

// Форматируем месяц с добавлением ведущего нуля

const formattedMonth = addLeadingZero(currentDateTime.getMonth() + 1); // +1, так как месяцы в JavaScript отсчитываются с нуля

 

// Форматируем день с добавлением ведущего нуля

const formattedDate = addLeadingZero(currentDateTime.getDate());

 

// Форматируем часы с добавлением ведущего нуля

const formattedHours = addLeadingZero(currentDateTime.getHours());

 

// Форматируем минуты с добавлением ведущего нуля

const formattedMinutes = addLeadingZero(currentDateTime.getMinutes());

 

// Форматируем дату и время в нужный формат

const formattedDateTime = (`${currentDateTime.getFullYear()}.`+formattedMonth+`.`+formattedDate+` `+formattedHours+`:`+formattedMinutes);

 

// В поле записать значение

document.getElementById('datetimeField').value = `/*${formattedDateTime} IMM*/`;