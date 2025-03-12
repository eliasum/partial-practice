//my
function getAverageAge(arr){
   return (arr.map(item => item.age)).reduce((sum, current) => sum + current, 0)/arr.length;
}

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 29 };

let arr = [ vasya, petya, masha ];

alert( getAverageAge(arr) );


////////////////////////////////////////////////////////////////////////////////////////////
function getAverageAge(users) {
return users.reduce((prev, user) => prev + user.age, 0) / users.lengt
}
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 29 };
let arr = [ vasya, petya, masha ];
alert( getAverageAge(arr) );