import dotenv
from utils.mongo import DB
from back.server import Server


if __name__ == "__main__":
    dotenv.load_dotenv()
    DB.connect()
    server = Server()
    server.run()

    @server.pocket_listener("attack")
    async def test(data):
        print("no way", data)