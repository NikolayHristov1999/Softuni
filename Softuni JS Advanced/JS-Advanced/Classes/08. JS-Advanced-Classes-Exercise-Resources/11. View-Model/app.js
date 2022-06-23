class Textbox {
    constructor(selector, regex){
        this._elements = document.querySelectorAll(selector);
        this._invalidSymbols = regex;
    }

    set value(va){
        this.value = va;
    }
    get value(){
        return this.value;
    }

    get elements(){
        return this._elements;
    }

    isValid(){
        
        for (elem of this.elements){
            if (this._invalidSymbols.test(elem.value)){
                return false;
            }
        }
        return true;
    }
}

let textbox = new Textbox(".textbox",/[^a-zA-Z0-9]/);
let inputs = document.getElementsByClassName('.textbox');
console.log(textbox.value)

inputs.addEventListener('click',function(){console.log(textbox.value);});
