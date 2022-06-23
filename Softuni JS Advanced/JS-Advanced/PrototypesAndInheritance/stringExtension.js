(function solve() {
    String.format = (str, ...params) => {

        for(let i = 0; i < params.length; i++){
            str = str.replace(`{${i}}`, params[i]);
        }

        return str;
    }
    String.prototype.ensureStart = function (str) {
        if(!this.startsWith(str)){
            return str + this;
        }
        return this.toString();
    }

    String.prototype.ensureEnd = function (str) {
        if(!this.endsWith(str)){
            return this + str;
        }
        return this.toString()
    }

    String.prototype.isEmpty = function () {
        if(this.toString == "" ){
            return true;
        }
        return false;
    }

    String.prototype.truncate = function (n) {
        if (this.length < n){
            return this.toString();
        }
        let lastIndex = this.lastIndexOf(' ', n);
        if (lastIndex < 0){
            if (n >= 3){
                return this.substring(0, n - 3) + "...";
            }
            let result = '';
            while(n > 0){
                result += '.';
                n--;
            }
            return result;
        } else {
            return this.substring(0, lastIndex) + "...";
        }
    }
})()


let str = 'my string';

console.log(''.isEmpty());
console.log(str.substring(3, 5))
console.log(str = str.ensureStart('my'));
console.log(str = str.truncate(16));
console.log(str = str.ensureStart('hello '));
console.log(str = str.truncate(14));
console.log(str = str.truncate(8));
console.log(str = str.truncate(4));
console.log(str = str.truncate(2));
str = String.format('The {0} {1} fox','quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}',
  'dog');
  
  console.log(str);


