class WebSocketClient {
    private url: string;
    private ws: WebSocket;

    constructor(url: string) {
        this.url = url;
        this.ws = new WebSocket(url);

        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
    }

    private onOpen(event: Event) {
        console.log("WebSocket connection opened");
        // You can perform any initialization or actions when the connection opens here
    }

    private onMessage(event: MessageEvent) {
        console.log(`Received message: ${event.data}`);
        // Handle the incoming message
    }

    private onError(event: Event) {
        console.error("WebSocket error:", event);
        // Handle errors
    }

    private onClose(event: CloseEvent) {
        console.log("WebSocket connection closed:", event);
        // Handle the connection closure
    }

    // Additional methods for sending data, closing the connection, etc.
}

// Creating an instance of the WebSocketClient class
const client = new WebSocketClient("ws://example.com/socket");
