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

/*2025.02.19 16:58 IMM*/
// В поле записать значение
document.getElementById('datetimeField').value = `<!--${formattedDateTime} IMM-->`;

/*2024.11.27 11:28 IMM*/
// Сохранить текстовое поле в переменную text
let text = document.getElementById('datetimeField');

// Сохранить кнопку в переменную btn
let btn = document.getElementById("copyText");

/* вызываем функцию при нажатии на кнопку */
btn.onclick = function() {
  text.select();    
  document.execCommand("copy");
}