/////////////////////////////////////////////////my/////////////////////////////////////////////////
let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function sumSalaries(salaries){
    let sum = 0;
    for(value of Object.values(salaries)) sum += value; 
    return sum;
}

alert( sumSalaries(salaries) ); // 650
////////////////////////////////////////////////////////////////////////////////////////////////////
function sumSalaries(salaries) {
		let sum = 0;
		for (let salary of Object.values(salaries)) {
		sum += salary;
	}
	
	return sum; // 650
}

let salaries = {
	"John": 100,
	"Pete": 300,
	"Mary": 250
};

alert( sumSalaries(salaries) ); // 650
////////////////////////////////////////////////////////////////////////////////////////////////////
function sumSalaries(salaries) {
	return Object.values(salaries).reduce((a, b) => a + b, 0) // 650
}

let salaries = {
	"John": 100,
	"Pete": 300,
	"Mary": 250
};

alert( sumSalaries(salaries) ); // 650