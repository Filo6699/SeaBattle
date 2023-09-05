const game1 = new Game(document.querySelector("#gameCanvas"),  true);
const game2 = new Game(document.querySelector("#gameCanvas2"), false);
const network = new GameNetwork("ws://localhost:8765")


function click(x: number, y: number) {
    let is_connected = network.send(AttackPacket(x, y));
    console.log("[NETWORK] is_connected: ", is_connected);
    if (!is_connected) return;
    game2.setActive(false);
}

function on_attack_response(data: { [key: string]: any }) {
    setTimeout(() => {
        let [x, y] = data['position'];
        game2.setCell(x, y, data['value']);
        game2.setActive(true);
    }, 1000);
}

game2.setActive(true);
game2.onClick = click;
network.addEventListener("attack_response", on_attack_response);
