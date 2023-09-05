import dotenv
from json import dumps as stringify
from back.utils.mongo import DB
from back.game_server import Server
from websockets.server import WebSocketServerProtocol


def main():
    dotenv.load_dotenv()
    DB.connect()
    server = Server()

    @server.listen("attack")
    async def test(packet, websocket: WebSocketServerProtocol):
        data = {"type": "attack_response", "value": 2, "position": packet['position']}
        await websocket.send(stringify(data))

    server.run()


if __name__ == "__main__":
    main()