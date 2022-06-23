function printArrayWithDelimeter(params, delimeter) {
    console.log(params.join(delimeter))
}

function printEveryNthElement(arr, number) {
    const arrSteps = [];
    for (let step = 0; step < arr.length; step += number) {
        arrSteps.push(arr[step]);
    }
    return arrSteps;
}

function addOrRemoveElements(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "add") {
            result.push(i + 1);
        }
        else {
            result.pop();
        }
    }

    if (result.length == 0) {
        console.log("Empty");
    }
    for (let el of result) {
        console.log(el);
    }
}

function shiftRight(arr, rotations) {
    let result = [];
    for (let i = arr.length - rotations % arr.length; i < arr.length; i++) {
        result.push(arr[i]);
    }

    for (let i = 0; i < arr.length - rotations % arr.length; i++) {
        result.push(arr[i]);
    }

    console.log(result.join(" "));
}

function increasingSubsequence(arr) {
    let biggest = Number.MIN_SAFE_INTEGER;
    const result = arr.filter(el => {
        if (el >= biggest) {
            biggest = el;
            return true;
        }
        return false;
    })
    return result;
}

function orderAscending(arr) {
    arr.sort((a, b) => a.localeCompare(b));
    let orderNumber = 1;
    arr.forEach((el) => {
        console.log(`${orderNumber}.${el}`);
        orderNumber++;
    })
}

function sortedNumber(arr) {
    const result = [];
    arr.sort((a, b) => a - b);

    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        result.push(arr[i]);
        result.push(arr[arr.length - 1 - i]);
    }
    if (arr.length % 2 == 1) {
        result.push(arr[Math.floor(arr.length / 2)]);
    }
    return result;
}

function customSortArray(arr) {
    arr.sort((a, b) => {
        if (a.length - b.length == 0) {
            return a.localeCompare(b);
        }
        return a.length - b.length;
    })
    arr.forEach((el) => {
        console.log(el)
    });
}

function magicMatrices(matrix) {
    const rowSum = [];
    const columnSum = [];
    for (let i = 0; i < matrix.length; i++){
        columnSum[i] = 0;
    }
    for (let i = 0; i < matrix.length; i++) {
        rowSum[0, i] = 0;
        for(let j = 0; j < matrix[i].length; j++) {
            rowSum[i] += matrix[i][j];
            columnSum[j] += matrix[i][j];
        }
    }
    console.log(rowSum);
    console.log(columnSum);
    for (let i = 0; i < rowSum.length; i++) {
        if (rowSum[i] != columnSum[i]){
            console.log(false);
            return;
        }
    }
    console.log(true);
}

magicMatrices([[11, 32, 45],
    [21, 0, 1],
    [21, 1, 1]]
    );
customSortArray(['alpha', 'beta', 'gamma']);
sortedNumber([1, 9, 3, 12, 16, 4, -2]);
orderAscending(["John", "Bob", "Christina", "Ema"]);
increasingSubsequence([1, 3, 8, 4, 10, 12, 3, 2, 24]);
shiftRight(['1', '2', '3', '4'], 1);
addOrRemoveElements(['add', 'add', 'remove', 'add', 'add']);
printEveryNthElement(['5', '20', '31', '4', '20'], 2);
printArrayWithDelimeter(['One', 'Two', 'Three', 'Four', 'Five'], '-');