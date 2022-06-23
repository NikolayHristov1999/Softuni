function playGame(moves) {

    function printBoard(board) {
        for (let row of board) {
            console.log(row.join("\t"));
        }
    }

    function winningCheck(currentBoard, player) {
        const isPlayer = (currentValue) => currentValue == player;
        for (let i = 0; i < currentBoard.length; i++) {
            if (currentBoard[i].every(isPlayer)) {
                return true;
            }
            if (currentBoard[0][i] == player
                && currentBoard[1][i] == player
                && currentBoard[2][i] == player) {
                return true;
            }
        }
        if (currentBoard[0][0] == player
            && currentBoard[1][1] == player
            && currentBoard[2][2] == player)
            return true;
        if (currentBoard[0][2] == player
            && currentBoard[1][1] == player
            && currentBoard[2][0] == player)
            return true;
    }
    const playerX = "X";
    const playerO = "O";
    const board =
        [[false, false, false],
        [false, false, false],
        [false, false, false]];

    let currentMoves = 0;
    let turnX = true;
    for (let i = 0; i < moves.length && currentMoves < 9; i++) {
        const move = moves[i].split(" ");
        let row = Number(move[0]);
        let column = Number(move[1]);

        if (board[row][column] != false) {
            console.log("This place is already taken. Please choose another!");
            continue;
        }
        else {
            let turn = playerX;
            if (turnX != true) {
                turn = playerO;
            }

            board[row][column] = turn;
            currentMoves++;
            if (winningCheck(board, turn)) {
                console.log(`Player ${turn} wins!`);
                printBoard(board);
                return;
            }
            turnX = !turnX;
        }
    }
    console.log("The game ended! Nobody wins :(");
    printBoard(board);

}


playGame(["0 1",
    "0 0",
    "0 2",
    "2 0",
    "1 0",
    "1 1",
    "1 2",
    "2 2",
    "2 1",
    "0 0"]
);
playGame(['0 1','0 0','0 2','2 0', '1 0','1 2','1 1','2 1','2 2','0 0']);