function camelize(str){
		let arr = str.split('-'); alert(arr);
    
       	let result = arr.map((word,index) => index==0 ? word : word[0].toUpperCase() + word.slice(1)); alert(result);

        return result.join('');
            

}

alert(camelize("background-color"));
alert(camelize("list-style-image"));
alert(camelize("-webkit-transition"));
