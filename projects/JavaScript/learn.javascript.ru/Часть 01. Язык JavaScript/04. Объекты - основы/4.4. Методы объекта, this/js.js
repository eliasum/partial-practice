let calculator = {

    sum(){
        return this.arg1 + this.arg2;
    },

    mul(){
        return this.arg1 * this.arg2;
    },
	

    read() {
        this.arg1 = +prompt('arg1?',0);
        this.arg2 = +prompt('arg2?',0);
    },

};

calculator.read();

alert( calculator.sum() );
alert( calculator.mul() ); 