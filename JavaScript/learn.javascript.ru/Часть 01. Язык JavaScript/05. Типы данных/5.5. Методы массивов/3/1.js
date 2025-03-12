function filterRangeInPlace(arr, a, b){
    return arr.splice(0,arr.length,arr.filter(item => (a <= item && item <= b)));
}

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4

alert( arr ); // [3, 1]

/////////////////////////////////////////////////////////////////////////////////

function filterRangeInPlace(arr, a, b) {

    for(let i=0; i<arr.length; i++){
        let val = arr[i]; 
        alert("i = " + i);  
        alert("val = " + val);  
        alert(val < a || val > b);

        if(val < a || val > b) {
            arr.splice(i,1); 
            i--; 
            alert("arr = " + arr);  
            alert("i = " + i); 
        }
        else alert("i = " + i); 
    }
}

let arr = [5, 3, 8, 1, 2, 11, 4, 15, 0, 20, -1, 30];

filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4
