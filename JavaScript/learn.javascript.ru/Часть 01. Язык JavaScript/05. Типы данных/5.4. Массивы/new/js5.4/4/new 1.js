//my
function sumInput(){

let arr = [];
let sum = 0;
    
    while(true){
        let answer = prompt("Введите число",'');
												  alert(answer);

        if(answer!==null && answer!=='' && isFinite(answer) ) {    alert("+");
			 answer = +answer;
             arr.push(answer);                    alert(arr);
             sum += answer;                       alert(sum);
        }
        else {
             alert("-");
             return sum; break;
        }
    }

}

alert(sumInput());

//js
function sumInput() {

let numbers = [];

while (true) {

	let value = prompt("Введите число", 0);

	// Прекращаем ввод?
	if (value === "" || value === null || !isFinite(value)) break;
	else{
		numbers.push(+value);
	}

	let sum = 0;

	for (let number of numbers) {
		sum += number;
	}

	return sum;
}

alert( sumInput() );