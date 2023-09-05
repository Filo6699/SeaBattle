class Listener {
    eventType: string;
    func: (...parameters: any[]) => void;

    constructor(eventType: string, func: (...parameters: any[]) => void) {
        this.eventType = eventType;
        this.func = func;
    }
}

abstract class WebSocketClient {
    url: string;
    socket: WebSocket;

    constructor(url: string) {
        this.url = url;
        this.connect();
    }

    connect() {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            this.socket = new WebSocket(this.url);

            this.socket.onopen = this.onOpen.bind(this);
            this.socket.onmessage = this.onMessage.bind(this);

            this.socket.addEventListener('close', (event) => {
                console.log('WebSocket closed with code:', event.code);

                setTimeout(() => {
                    this.connect();
                }, 3000);
            });

            this.socket.addEventListener('error', (error) => {
                console.error('WebSocket error:', error);

                setTimeout(() => {
                    this.connect();
                }, 3000);
            });
        }
    }

    abstract onOpen(event: Event): void;

    abstract onMessage(event: MessageEvent): void;
}


class GameNetwork extends WebSocketClient {
    authToken: string | null;
    eventListeners: Listener[] = [];

    constructor(url: string) {
        super(url);
        this.authToken = "todo";
    }

    addEventListener(eventType, func) {
        let listener = new Listener(eventType, func);
        this.eventListeners.push(listener);
    }

    send(data: any): boolean {
        if (this.socket.readyState !== WebSocket.OPEN) return false;
        data['auth'] = this.authToken;
        this.socket.send(JSON.stringify(data));
        return true;
    }

    onOpen(event: Event): void {}

    onMessage(event: MessageEvent): void {
        let data = JSON.parse(event.data);
        if (!data['type']) return;
        this.eventListeners.forEach(listener => {
            if (listener.eventType == data['type']) {
                listener.func(data);
            }
        });
    }
}
