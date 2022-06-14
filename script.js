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

    return { setField, getField };
})();

// Module for game display control //

const displayController = (() => {
    const fieldElements = document.querySelectorAll(".field");
    const messageElement = document.querySelector(".message");
    const rematchElement = document.querySelector(".rematch");
    const resetElement = document.getElementById('reset');

    // Reset entire webpage //
    resetElement.addEventListener("click", reloadPage);

    function reloadPage() {
        location.reload();
    };

    // Display winner result //
    const SetResultMessage = (winner) => {
        if (winner === "Draw") {
            messageElement.textContent = "Draw!";
        } else {
            messageElement.textContent = `${winner} has won!`;
        };
    };

    return {};
})();

