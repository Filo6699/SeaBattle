import websockets
import json
import asyncio
from websockets.server import WebSocketServerProtocol
from websockets.exceptions import ConnectionClosedOK
from json import JSONDecodeError
from back.utils.mongo import DB


class Server:
    def __init__(self) -> None:
        self.connections = []
        self.users = []
        self.listeners = []
    
    def add_listener(self, func, pocket_type):
        self.listeners.append([func, pocket_type])

    def listen(self, pocket_type):
        def decorator(func):
            self.add_listener(func, pocket_type)
        return decorator

    def handle_pocket(self, data: dict, websocket: WebSocketServerProtocol):
        if not data or not data.get("type") or not data.get("auth"):
            return
        
        user = DB.users.find({"_auth": data['auth']}, limit=1)
        if not user:
            return
        
        for l in self.listeners:
            if l[1] == data['type']:
                asyncio.create_task(l[0](data, websocket))
    
    async def websocket_handler(self, websocket: WebSocketServerProtocol, path):
        while True:
            try:
                data = await websocket.recv()
                data = json.loads(data)

                self.handle_pocket(data, websocket)
            except (ConnectionClosedOK, JSONDecodeError):
                pass

    def run(self):
        start_server = websockets.serve(self.websocket_handler, 'localhost', 8765)

        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()
