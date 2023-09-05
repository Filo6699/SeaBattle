abstract class WebSocketClient {
    url: string;
    ws: WebSocket;
    reconnect_attempts: number = 0;

    constructor(url: string) {
        this.url = url;
        this.connect();

        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
    }

    private connect() {
        try {
            this.ws = new WebSocket(this.url);
        } catch (err) {
            console.log("[ERROR] ", err);
            // catch doesn't work bruh
        }
    }

    abstract onOpen(event: Event): void;

    abstract onMessage(event: MessageEvent): void;

    onError(event: Event) {
        console.error("WebSocket error:", event);
    }

    onClose(event: CloseEvent) {
        console.log("WebSocket connection closed:", event);
    }
}


class GameNetwork extends WebSocketClient {
    authToken: string | null;
    constructor(url: string) {
        super(url);
        this.authToken = "todo";
    }

    send(data: any) {
        data['auth'] = this.authToken;
        this.ws.send(JSON.stringify(data));
    }

    onOpen(event: Event): void {}

    onMessage(event: MessageEvent): void {
        console.log("[EVENT] ", event.data);
    }
}
