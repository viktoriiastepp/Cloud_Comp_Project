import azure.functions as func
import logging
import os
import json
from azure.storage.queue import QueueClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetOrderStatus function called")

    try:
        # 🔹 Get storage connection string
        connection_string = os.getenv("AzureWebJobsStorage")
        if not connection_string:
            raise Exception("Missing AzureWebJobsStorage")

        # 🔹 Connect to the 'orders' queue
        queue_client = QueueClient.from_connection_string(
            conn_str=connection_string, queue_name="orders"
        )

        # 🔹 Peek up to 32 messages (does not remove them)
        messages = queue_client.peek_messages(max_messages=32)

        orders = []
        for msg in messages:
            try:
                orders.append(json.loads(msg.content))
            except Exception:
                # fallback if message is plain text
                orders.append({"content": msg.content})

        return func.HttpResponse(
            json.dumps({"orders": orders}),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        logging.error(f"GetOrderStatus error: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=500,
            mimetype="application/json"
        )
