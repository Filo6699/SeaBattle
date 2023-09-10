const EMPTY = 0;
const SHIP = 1;
const MISS = 2;
const HIT = 3;
var mousePos: number[];

document.addEventListener("mousemove", handleMouseMove)

function handleMouseMove(event: MouseEvent) {
    mousePos = [event.clientX, event.clientY]
}