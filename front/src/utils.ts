var mousePos: number[];

document.addEventListener("mousemove", handleMouseMove)

function handleMouseMove(event: MouseEvent) {
    mousePos = [event.clientX, event.clientY]
}