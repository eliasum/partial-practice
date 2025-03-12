/////////////////////////////////////////////////my/////////////////////////////////////////////////
let user = {
    name: 'John',
    age: 30,
    age1: 31,
};

function count(user){
    return Object.values(user).reduce(a => a+1, 0)
}

alert( count(user) );
////////////////////////////////////////////////////////////////////////////////////////////////////
let user = {
    name: 'John',
    age: 30,
    age1: 31,
};

function count(obj) {
	return Object.keys(obj).length;
}

alert( count(user) );