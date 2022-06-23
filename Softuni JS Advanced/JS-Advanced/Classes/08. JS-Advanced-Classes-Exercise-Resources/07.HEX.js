class Hex{
    constructor(value){
        this.value = value;
    }

    valueOf(){
        return this.value;
    }

    toString(){
        return '0x' + this.value.toString(16).toUpperCase();
    }

    plus(number){
        let result = 0
        if (number instanceof Number){
            result = this.value + number;
        } else{
            result = this.value + parseInt(number, 16);
        }
        return new Hex(result);
    }
    minus(number){
        let result;
        if (number instanceof Number){
            result = this.value - number;
        } else{
            result = this.value - parseInt(number, 16);
        }
        return new Hex(result);
    }

    parse(number){
        return parseInt(number, 16);
    }
}
let FF = new Hex(255);
console.log(FF.toString());
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
console.log(a.plus(b).toString());
console.log(FF.parse('AAA'));

