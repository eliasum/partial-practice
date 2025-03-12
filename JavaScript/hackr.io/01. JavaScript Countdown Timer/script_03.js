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
    // Получаем текущее время
    const currentTime = new Date();
    
    if (!updateCountdown.initialized) { 
        // Устанавливаем целевую дату на 5 минут позже текущей при первом запуске
        targetDate = new Date(currentTime.getTime() + 5 * 60000);
        console.log('Целевая дата и время (через 5 минут):', targetDate);
        updateCountdown.initialized = true;
    }

    // Вычисляем разницу между целевой датой и текущим временем в миллисекундах
    const difference = targetDate - currentTime;
  
    if (difference <= 0) {
        // Если время истекло, очищаем интервал и отображаем сообщение
        clearInterval(interval);
        document.getElementById("timer").innerText = "Событие началось!";
        return;
    }

    // Вычисляем количество полных дней
    // (1000 * 60 * 60 * 24) - число миллисекунд в одном дне
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    // Вычисляем количество полных часов, оставшихся после вычитания дней
    // (1000 * 60 * 60) - число миллисекунд в одном часе
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    // Вычисляем количество полных минут, оставшихся после вычитания часов
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    
    // Вычисляем количество секунд, оставшихся после вычитания минут
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
    // Обновляем текст в элементах DOM с соответствующими id
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

// Запускаем проверку оставшегося времени каждую секунду
const interval = setInterval(updateCountdown, 1000);

// Вызываем функцию один раз сразу, чтобы избежать задержки в отображении
updateCountdown();