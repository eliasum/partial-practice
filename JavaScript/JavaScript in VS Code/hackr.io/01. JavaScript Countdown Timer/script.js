/*2025.03.11 17:39 IMM*/
'use strict';

let targetDate;
let countdownInterval;

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        document.getElementById("timer").innerHTML = "Событие началось!";
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days.toString().padStart(2, '0');
    document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
    document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
}

function startCountdown() {
    // Устанавливаем целевую дату на 5 минут от текущего времени
    targetDate = new Date().getTime() + 5 * 60 * 1000;

    // Обновляем каждые 100 миллисекунд для более плавного отсчета
    countdownInterval = setInterval(updateCountdown, 100);

    // Сразу вызываем updateCountdown, чтобы избежать задержки в отображении
    updateCountdown();
}

// Запускаем отсчет при загрузке страницы
window.onload = startCountdown;