function notation(arr) {
    const arithmetic = {
        '+': function (a, b) {
            return a + b;
        },
        '-': function (a, b) {
            return a - b;
        },
        '*': function (a, b) {
            return a * b;
        },
        '/': function (a, b) {
            return a / b;
        },
    }
    for (let i = 0,counter = 0; i < arr.length && arr.length > 1 && counter < 10; i++,counter++) {
        if (typeof arr[i] === 'string' || arr[i] instanceof String) {
            if (i < 2) {
                console.log("Error: not enough operands!");
                return;
            }
            const functionName = arr[i];
            let sum = arithmetic[functionName](arr[i-2], arr[i-1]);
            arr.splice(i - 2, 3, sum);
            i -= 3;
        }
    }
    if (arr.length > 1){
        console.log("Error: too many operands!");
    }
    else{
        console.log(arr[0]);
    }
}

notation([5,
    3,
    4,
    5,
    '*',
    '-'])