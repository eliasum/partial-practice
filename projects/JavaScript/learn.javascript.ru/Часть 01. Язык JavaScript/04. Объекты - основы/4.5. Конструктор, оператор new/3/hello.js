function Accumulator(startingValue) {
    this.value = startingValue;

    this.read = function() {
         this.value += +prompt("Введите число",0);
    }
}

let accumulator = new Accumulator(1); // начальное значение 1

accumulator.read(); // прибавляет введённое пользователем значение к текущему
accumulator.read(); // прибавляет введённое пользователем значение к текущему

alert(accumulator.value); // выведет сумму этих значений