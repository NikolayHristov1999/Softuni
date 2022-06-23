function diagonalAttack(stringMatrix) {
    const length = stringMatrix.length;
    let sumMainD = 0;
    let sumSecD = 0;
    let matrix = [];
    stringMatrix.forEach(function (element, index) {
        matrix[index] = element.split(' ').map(Number);
    });
    for (let i = 0; i < matrix.length; i++) {
        sumMainD += matrix[i][i];
        sumSecD += matrix[i][matrix.length - 1 - i];
    }
    if (sumMainD == sumSecD) {
        matrix.forEach(function (element, row) {
            row = element.forEach(function (number, col, arr){
                if (row != col && matrix.length - 1 - row != col){
                    arr[col] = sumMainD;
                }
            })
        });
    }
    for (let row of matrix){
        console.log(row.join(" "));
    }
}

diagonalAttack(['5 3 12 3 1',
                '11 4 23 2 5',
                '101 12 3 21 10',
                '1 4 5 2 2',
                '5 22 33 11 1']);