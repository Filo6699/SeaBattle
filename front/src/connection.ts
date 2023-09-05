abstract class WebSocketClient {
    url: string;
    ws: WebSocket;

    constructor(url: string) {
        this.url = url;
        this.ws = new WebSocket(url);

        this.ws.onopen = this.onOpen.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
        this.ws.onerror = this.onError.bind(this);
        this.ws.onclose = this.onClose.bind(this);
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
