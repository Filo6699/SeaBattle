from websockets.server import WebSocketServerProtocol
from websockets.exceptions import ConnectionClosedOK
import websockets
import json
import asyncio


class Server:
    def __init__(self) -> None:
        self.connections = []
        self.listeners = []
    
    def add_connection(self, conn):
        self.connections.append(conn)
    
    def add_listener(self, func, pocket_type):
        self.listeners.append([func, pocket_type])
    
    def pocket_listener(self, pocket_type):
        def wrap(func):
            self.add_listener(func, pocket_type)
            return func
        return wrap

    def handle_pocket(self, data: dict, websocket: WebSocketServerProtocol):
        if not data or not data.get("action"):
            return
        
        print(self.listeners)
        for l in self.listeners:
            if l[1] == data['action']:
                asyncio.create_task(l[0](data))
    
    async def websocket_handler(self, websocket: WebSocketServerProtocol, path):
        while True:
            try:
                data = await websocket.recv()
                data = json.loads(data)
                
                self.handle_pocket(data, websocket)
                # response_data = {"message": "Data received successfully"}
                # await websocket.send(json.dumps(response_data))
            except ConnectionClosedOK:
                pass

    def run(self):
        start_server = websockets.serve(self.websocket_handler, 'localhost', 8765)

        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()