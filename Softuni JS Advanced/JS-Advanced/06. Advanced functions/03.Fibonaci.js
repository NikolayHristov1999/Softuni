function getFibonator(){
    let previous = -1;
    let counter = 1;
    return function fib(){
        if (previous == -1 ){
            previous++;
            return 1;
        }
        counter += previous;
        previous = counter - previous;
        return counter;
    }
}


let fib = getFibonator();
console.log(fib()); // 1
console.log(fib()); // 1
console.log(fib()); // 2
console.log(fib()); // 3
console.log(fib()); // 5
console.log(fib()); // 8
console.log(fib()); // 13
