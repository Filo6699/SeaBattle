import json
import asyncio
from websockets.server import WebSocketServerProtocol
from websockets.exceptions import ConnectionClosedOK
import websockets
from flask import Flask


app = Flask(__name__)
server_ip = "localhost"
server_port = 8765

async def websocket_handler(websocket: WebSocketServerProtocol, path):
    while True:
        try:
            data = await websocket.recv()
            data = json.loads(data)
            
            response_data = {"message": "Data received successfully"}
            await websocket.send(json.dumps(response_data))
        except ConnectionClosedOK:
            pass

if __name__ == "__main__":
    start_server = websockets.serve(websocket_handler, 'localhost', 8765)

    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()
