function spiralMatrix(length, width) {
    let matrix = new Array(length);
    let counter = 1;
    for (let i = 0; i < matrix.length; i++){
        matrix[i] = new Array(width);
    }
    let cycles = Math.ceil(Math.min(length,width) / 2);
    for (let i = 0; i < cycles ; i++) {
        let row = i;
        let col = i;
        for (; col < width - i - 1; col++) {
            matrix[row][col] = counter;
            counter++;
        }
        for (; row < length - i - 1; row++) {
            matrix[row][col] = counter;
            counter++;
        }
        if (col <= i || row <= i) {
            matrix[row][col] = counter;
            break;
        }
        for (; col > i; col--) {
            matrix[row][col] = counter;
            counter++;
        }
        for (;row > i; row--) {
            matrix[row][col] = counter;
            counter++;
        }
    }
    for(let row of matrix){
        console.log(row.join(" "));
    }
}


spiralMatrix(5,5);
