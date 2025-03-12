/*2024.03.20 16:52 IMM*/
/////////////////////////////////////////////////my/////////////////////////////////////////////////
function inBetween(a,b){
    return function(x){
        if(x>=a && x<=b) return x;
    }
}

function inArray(array){
    return function(x){
        for(let i=0; i<array.length; i++) if(x === array[i]) return x;
    }
}

let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2
////////////////////////////////////////////////////////////////////////////////////////////////////
function inBetween(a, b) {
	return function(x) {
		return x >= a && x <= b;
	};
}

function inArray(arr) {
	return function(x) {
		return arr.includes(x);
	};
}

let arr = [1, 2, 3, 4, 5, 6, 7];

alert( arr.filter(inBetween(3, 6)) ); // 3,4,5,6

alert( arr.filter(inArray([1, 2, 10])) ); // 1,2