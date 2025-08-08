/////////////////////////////////////////////////my/////////////////////////////////////////////////
function unique(arr) {
    let set = new Set(arr);
    let arr2=[];
    for (let value of set) arr2.push(value);
    return arr2;  
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
"Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare,Krishna,:-O
////////////////////////////////////////////////////////////////////////////////////////////////////
function unique(arr) {
	return Array.from(new Set(arr));
}