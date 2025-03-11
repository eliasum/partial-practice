/**2025.02.18 17:50 IMM*/
'use strict';

/**
 * Simple message logging
 * @type {string}
 */
const msg = 'Hello World';
console.log(msg);

// Implement countdown timer functionality
function startCountdown(duration, displayElement) {
    let timer = duration;
    let minutes, seconds;

    const countdownInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        displayElement.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(countdownInterval);
            displayElement.textContent = "Время истекло!";
        }
    }, 1000);
}

// Пример использования
const timerDisplay = document.getElementById('timer');
const durationInSeconds = 5 * 60; // 5 минут
startCountdown(durationInSeconds, timerDisplay);

/*
Этот код добавляет функцию startCountdown, которая реализует функциональность таймера обратного отсчета. Вот краткое объяснение:
1.
Функция startCountdown принимает два параметра: duration (продолжительность в секундах) и displayElement (элемент DOM для отображения таймера).
2.
Таймер обновляется каждую секунду с помощью setInterval.
3.
Минуты и секунды вычисляются и форматируются для отображения.
4.
Когда таймер достигает нуля, интервал очищается, и отображается сообщение "Время истекло!".
Для использования этого кода вам нужно добавить элемент с id "timer" в ваш HTML файл, например:
<div id="timer"></div>
Apply
Затем вы можете настроить начальную продолжительность таймера, изменив значение durationInSeconds.
Не забудьте адаптировать этот код под ваши конкретные потребности и дизайн пользовательского интерфейса.

script.js
(1-11)
*/
