/*2024.05.16 14:51 IMM*/

//my 
function makeCounter(value) {
    
    makeCounter.count = 0;

    function counter() {
        return makeCounter.count++; 
    };

    counter.set = function(value){
        if(value) makeCounter.count = value;
    }

    counter.decrease = function(){
        if(makeCounter.count > 0) makeCounter.count--;
    }
    
    return counter;
}

let counter = makeCounter();

counter.set(5);
counter.decrease();
counter.decrease();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2

////////////////////////////
function makeCounter() {
    
    let count = 0;
    
    function counter() {
        return count++;
    }
    
    counter.set = value => count = value;
    
    counter.decrease = () => count--;
    
    return counter;
}

let counter = makeCounter();

counter.set(5);
counter.decrease();
counter.decrease();

alert( counter() ); // 0
alert( counter() ); // 1
alert( counter() ); // 2