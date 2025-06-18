/*2025.03.11 17:39 IMM*/
'use strict';

// Объявляем targetDate в глобальной области видимости
let targetDate;

/**
 * Функция updateCountdown обновляет отображение оставшегося времени до целевой даты.
 * Она вычисляет разницу между текущим временем и целевой датой, затем разбивает
 * эту разницу на дни, часы, минуты и секунды, и обновляет соответствующие элементы DOM.
 */
function updateCountdown() {
    const currentTime = new Date();
    
    if (!updateCountdown.initialized) { 
        targetDate = new Date(currentTime.getTime() + 5 * 60000);
        console.log('Целевая дата и время (через 5 минут):', targetDate);
        updateCountdown.initialized = true;
    }

    const difference = targetDate - currentTime;
  
    if (difference <= 0) {
        clearInterval(interval);
        document.getElementById("timer").innerText = "Событие началось!";
        return;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    // Форматируем значения, добавляя ведущий ноль, если значение меньше 10
    const formattedDays = days.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Обновляем текст в элементах DOM с соответствующими id
    document.getElementById("days").innerText = formattedDays;
    document.getElementById("hours").innerText = formattedHours;
    document.getElementById("minutes").innerText = formattedMinutes;
    document.getElementById("seconds").innerText = formattedSeconds;

    // Альтернативно, можно обновить один элемент с полным таймером
    // document.getElementById("timer").innerText = 
    //     `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Запускаем проверку оставшегося времени каждую секунду
const interval = setInterval(updateCountdown, 1000);

// Вызываем функцию один раз сразу, чтобы избежать задержки в отображении
updateCountdown();