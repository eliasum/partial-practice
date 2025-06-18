/*2024.05.15 17:32 IMM*/

function makeCounter() {
    
    function counter() {
        return counter.count++;
    };
    
    //counter.count = 0;
    
    return counter;
}

let counter = makeCounter();

counter.count = 10;

alert( counter() ); // 10
alert( counter() ); // 11
alert( counter() ); // 12