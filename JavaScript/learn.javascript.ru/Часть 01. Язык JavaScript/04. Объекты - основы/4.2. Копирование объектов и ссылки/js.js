/*1*/
const a = {
    j: {
        m: 'love'
       }
};

const b = JSON.parse(JSON.stringify(a));

a.j.m = 'death';

console.log(b.j.m); // love

/*2*/
let obj = {a:1, b: {c:2}};

let clone = JSON.parse(JSON.stringify(obj));

console.log(clone);