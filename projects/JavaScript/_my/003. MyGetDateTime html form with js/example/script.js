// Код, который нужно выполнить при нажатии на кнопку

const currentDateTime = new Date();

const formattedDateTime = (`${currentDateTime.getDate()}.${currentDateTime.getMonth() + 1}.${currentDateTime.getFullYear()} ${currentDateTime.getHours()}:${currentDateTime.getMinutes()}:${currentDateTime.getSeconds()}`);

alert(`Текущая дата и время: ${formattedDateTime}`);