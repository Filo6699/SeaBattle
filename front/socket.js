var socket;

const connectButton = document.getElementById("connectButton");

connectButton.addEventListener("click", () => {
    if (socket) {
        socket.close()
    }
    socket = new WebSocket("ws://localhost:8765");
    
    socket.addEventListener("open", (event) => {
        console.log("WebSocket connection opened");
        data = {
            "message": "Connected"
        }
        socket.send(JSON.stringify(data))
    });

    socket.addEventListener("message", (event) => {
        console.log(`Received message: ${event.data}`);
    });

    socket.addEventListener("close", (event) => {
        console.log("WebSocket connection closed");
    });
});
