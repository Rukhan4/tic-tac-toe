// Factory for multiple Players //

const Player = (sign) => {
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
        }
    }
    return { setField, getField, rematch };
})();

// Module for game display control //

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.querySelector(".message");
    const rematchButton = document.getElementById("rematch");
    const resetElement = document.getElementById('reset');

    // Reset entire webpage //
    resetElement.addEventListener("click", reloadPage);

    function reloadPage() {
        location.reload();
    };

    // Display player result //
    const SetResultMessage = (res) => {
        if (res === "Draw") {
            messageElement.textContent = "Draw!";
        } else {
            messageElement.textContent = `${res} has won!`;
        };
    };

    // Changes gameboard //
    const updateGameboard = () => {
        for (let i = 0; i < fieldElements.length; i++) {
            fieldElements[i].textContent = gameBoard.getField(i);
        }
    };

    // Rematch after round played //
    rematchButton.addEventListener("click", (e) => {
        e.preventDefault();
        gameBoard.rematch();
        updateGameboard();
        messageElement.textContent = "Player X Turn";

        return { SetResultMessage };
    });
})();


