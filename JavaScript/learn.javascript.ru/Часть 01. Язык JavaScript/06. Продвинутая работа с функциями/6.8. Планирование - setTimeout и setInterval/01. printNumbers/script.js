/*2024.06.04 16:50 IMM*/

//MY setInterval 1 (неправильно)
function printNumbers(from, to) {

    let i=from;
    
    while(i<to){
        alert(i); i++;
    }

    clearInterval(timerId);
}

let timerId = setInterval(printNumbers, 1000, 5, 10);

//MY setInterval 2
function printNumbers(from, to) {

    let i=from;

    let timerId = setInterval(function(){
        alert(i);
        if(i<to) i++;
        else clearInterval(timerId);
    }, 1000);
    
}

printNumbers(5, 10);
/////////////
//setInterval
function printNumbers(from, to) {
    
    let current = from;
    
    let timerId = setInterval(function() {
        
        alert(current);
        
        if (current == to) {
            clearInterval(timerId);
        }
        
        current++;
        
    }, 1000);
}

// использование:
printNumbers(5, 10);
///////////////////////////////////////////////////////////

//MY setTimeout 1
function printNumbers(from, to) {

    let i=from;

    let timerId = setTimeout(function tick(){
        alert(i);
        timerId = setTimeout(tick,1000);
        
        if(i<to) i++;
        else clearTimeout(timerId);
    }, 1000);
    
}

printNumbers(5, 10);

//MY setTimeout 2
function printNumbers(from, to) {

    let i=from;

    setTimeout(function tick(){
        alert(i);
               
        if(i<to) {setTimeout(tick,1000); i++;}

    }, 1000);
}

printNumbers(5, 10);
////////////
//setTimeout
function printNumbers(from, to) {
    let current = from;
    
    setTimeout(function go() {
        
    alert(current);
        
    if (current < to) {
        setTimeout(go, 1000);
    }
        
    current++;
    }, 1000);
}

// использование:
printNumbers(5, 10);

// без задержки 1000 мс
function printNumbers(from, to) {
    let current = from;
    
    function go() {
        
        alert(current);
        
        if (current == to) {
            clearInterval(timerId);
        }
        current++;
    }
    
    go();
    
    let timerId = setInterval(go, 1000);
}

printNumbers(5, 10);