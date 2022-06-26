// Factory for multiple Players //

const Player = (sign, playerOne, playerTwo) => {
    const playerOneName = document.getElementById("player-1");
    const playerTwoName = document.getElementById("player-2");
    const start = document.getElementById('start');
    const form = document.querySelector('.formholder');

    start.addEventListener("click", () => {
        form.style.display = "none";
        playerOne = document.getElementById("playerx").value;
        playerTwo = document.getElementById("playero").value;
        playerOneName.textContent = `${playerOne}'s Score (X)`;
        playerTwoName.textContent = `${playerTwo}'s Score (O)`;
        document.getElementById("message").style.color = "black";
    });
    this.playerOne = playerOne;
    this.sign = sign;

    const getSign = () => {
        return sign;
    };

    return { getSign };
};

// Module for gameboard controls //

const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        if (index > board.length) return;
        board[index] = sign;
    };

    const getField = (index) => {
        if (index > board.length) return;
        return board[index];
    };

    const rematch = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        };
    };
    return { setField, getField, rematch };
})();

// Module for game display control //

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.getElementById("message");
    const rematchButton = document.getElementById("rematch");
    const resetElement = document.getElementById('reset');
    const playerOneElement = document.getElementById("player-1-score");
    const playerTwoElement = document.getElementById("player-2-score");
    const playerTwoName = document.getElementById("player-2");

    // Reset entire webpage //
    resetElement.addEventListener("click", reloadPage);

    function reloadPage() {
        location.reload();
    };

    // Manage textContent //
    const setMessageElement = (message) => {
        messageElement.textContent = message;
    };

    // Display player result //
    const setResultMessage = (winner) => {
        if (winner === "Draw") {
            setMessageElement("It's a draw!");
            document.getElementById("rematch").style.display = "block";
        } else {
            setMessageElement(`Player ${winner} has won!`);
            if (winner === "X") {
                playerOneElement.textContent++;
            } else {
                playerTwoElement.textContent++;
            };
        };
    };

    // Changes gameboard //
    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        };
    };

    // Update field on click //
    fieldElements.forEach((field) =>
        field.addEventListener("click", (e) => {
            if (gameController.gameOver() || e.target.textContent !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateGameboard();
        })
    );

    // Rematch after round played //
    rematchButton.addEventListener("click", (e) => {
        gameBoard.rematch();
        gameController.reset();
        updateGameboard();
        setMessageElement("Player X's turn");
        document.getElementById("rematch").style.display = "none";
    });
    return { setResultMessage, setMessageElement };
})();


const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");
    var round = 1;
    var gameOff = false;

    // Gets current player sign //
    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? playerX.getSign() : playerO.getSign();
    };

    // Play one round and check if winner //
    const playRound = (fieldIndex) => {
        gameBoard.setField(fieldIndex, getCurrentPlayerSign());
        if (checkWinner(fieldIndex)) {
            displayController.setResultMessage(getCurrentPlayerSign());
            document.getElementById("rematch").style.display = "block";
            gameOff = true;
            return;
        };
        if (round === 9) {
            displayController.setResultMessage("Draw");
            document.getElementById("rematch").style.display = "block";
            gameOff = false;
            return;
        };
        round++;
        displayController.setMessageElement(`Player ${getCurrentPlayerSign()}'s Turn`);
    };

    // Algorithm for checking if winner //
    const checkWinner = (fieldIndex) => {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        return winConditions
            .filter((combination) => combination.includes(fieldIndex))
            .some((possibleCombination) =>
                possibleCombination.every(
                    (index) => gameBoard.getField(index) ===
                        getCurrentPlayerSign())
            );
    };

    // Check if game is over //
    const gameOver = () => {
        return gameOff;
    };

    // Soft reset //
    const reset = () => {
        round = 1
        gameOff = false
    };

    return { playRound, gameOver, reset };
})();