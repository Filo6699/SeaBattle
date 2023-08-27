const boardSize = 10;
const board = document.querySelector(".game-board")

// states
const EMPTY = "cell-empty";
const MISS = "cell-miss";
const HIT = "cell-hit";
const SHIP = "cell-ship";


function generate_cell(x, y, state) {
    let element = document.createElement("div");
    element.setAttribute("x", x);
    element.setAttribute("y", y);
    element.setAttribute("state", state);
    element.classList.add("cell");
    if (state != EMPTY) {    
        element.classList.add(state);
    }
    element.addEventListener('click', () => {
        handleCellClick(element);
    });
    return element
}

function handleCellClick(cell) {
    x = cell.getAttribute("x");
    y = cell.getAttribute("y");
    state = cell.getAttribute("state");
    if (state == EMPTY) {
        if (!socket) return;
        // socket = new WebSocket("ws://localhost:8765");
        data = {
            "action": "attack",
            "pos": [x, y]
        }
        socket.send(JSON.stringify(data))
    }
}

function generateBoard() {
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            let cell = generate_cell(x, y, EMPTY);
            board.appendChild(cell);
        }
    }
};

function displayBoard() {
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            let cell = generate_cell(x, y);
            board.appendChild(cell);
        }
    }
}

generateBoard()