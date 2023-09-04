const game = new Game(document.querySelector("#gameCanvas"), false);


function testClick(x: number, y: number) {
    console.log(`click info: x=${x} y=${y}`);
}

game.setActive(true);
game.addEventListener("click", testClick);
