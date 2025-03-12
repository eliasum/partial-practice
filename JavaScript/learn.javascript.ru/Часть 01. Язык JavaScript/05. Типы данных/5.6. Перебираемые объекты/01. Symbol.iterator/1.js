let range = {
    from: 1,
    to: 5
};

// 1. вызов for..of сначала вызывает эту функцию
range[Symbol.iterator] = function() {
    // ...она возвращает объект итератора:
    // 2. Далее, for..of работает только с этим итератором, запрашивая у него но
    return {
        current: this.from,
        last: this.to,
        // 3. next() вызывается на каждой итерации цикла for..of
        next() {
            // 4. он должен вернуть значение в виде объекта {done:.., value :...}
            if (this.current <= this.last) {
                return { done: false, value: this.current++ };
            } else {
              return { done: true };
            }
        }
    };
};

// теперь работает!
for (let num of range) {
    alert(num); // 1, затем 2, 3, 4, 5
}
/////////////////////////////////////////////////my/////////////////////////////////////////////////
let range = {
    from: 1,
    to: 5
};

range[Symbol.iterator] = function(){
    return{
        current: this.from,
        last: this.to,
        next(){
            if(this.current <= this.last) return {done: false, value: this.current++};
            else return {done: true};
        }
    }
};

for(num of range) alert(num);
////////////////////////////////////////////////////////////////////////////////////////////////////
let range = {
    from: 1,
    to: 5,
    
    [Symbol.iterator]() {
        this.current = this.from;
        this.last = this.to;
        return this;
    },
    
    next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
    }
};

for (let num of range) {
alert(num); // 1, затем 2, 3, 4, 5
}