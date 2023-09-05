import os
from pymongo.mongo_client import MongoClient
from pymongo.collection import Collection


class DB:
    client: MongoClient = None
    users: Collection = None
    tasks: Collection = None

    @classmethod
    def connect(cls):
        _host = os.environ["mongo_host"]
        _port = 27017
        _username = os.environ["mongo_username"]
        _password = os.environ["mongo_password"]
        _db = os.environ["mongo_db"]
        
        cls.client = MongoClient(_host, _port, username=_username, password=_password)
        cls.users = cls.client.get_database(_db).get_collection("users")
