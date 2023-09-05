const game1 = new Game(document.querySelector("#gameCanvas"),  true);
const game2 = new Game(document.querySelector("#gameCanvas2"), false);
const network = new GameNetwork("ws://localhost:8765")


function click(x: number, y: number) {
    network.send(AttackPacket(x, y));
}

game2.setActive(true);
game2.addEventListener("click", click);
