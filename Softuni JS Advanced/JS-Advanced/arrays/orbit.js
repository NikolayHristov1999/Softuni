function orbit(arr) {
    let [length, width, starRow, starCol] = arr;
    const space = [];
    for (let i = 0; i < length; i++) {
        space[i] = [];
        for (let j = 0; j < width; j++) {
            let max = Math.max(Math.abs(i - starRow), Math.abs(j - starCol));
            space[i][j] = 1 + max;
        }
    }
    for (let row of space) {
        console.log(row.join(" "));
    }


}

orbit([4, 4, 0, 0]);