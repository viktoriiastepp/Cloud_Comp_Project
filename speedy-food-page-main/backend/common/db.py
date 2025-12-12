import os
from azure.data.tables import TableClient
from azure.storage.queue import QueueClient

def get_connection_string():
    conn = os.getenv("TABLE_CONN")
    if not conn:
        raise EnvironmentError("TABLE_CONN environment variable not set")
    return conn

def get_table_client(table_name: str) -> TableClient:
    conn = get_connection_string()
    return TableClient.from_connection_string(conn, table_name)

def get_queue_client(queue_name: str) -> QueueClient:
    conn = get_connection_string()
    return QueueClient.from_connection_string(conn, queue_name)
