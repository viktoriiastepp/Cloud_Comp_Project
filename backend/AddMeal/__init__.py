import azure.functions as func
import logging
import json
import os
from datetime import datetime
from azure.data.tables import TableClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("AddMeal function called")

    try:
        body = req.get_json()

        # Required fields
        partition_key = body["partition_key"]  # must match restaurant
        row_key = body["row_key"]              # unique meal ID
        name = body["name"]
        description = body.get("description", "")
        price = float(body["price"])
        image_url = body.get("image_url", "")
        availability = body.get("availability", "Available")  # "Available" or "Sold Out"
        timestamp = body.get("timestamp") or datetime.utcnow().isoformat()

        # Connect to Meals table
        table_client = TableClient.from_connection_string(
            conn_str=os.getenv("TABLE_CONN"),
            table_name="Meals"
        )

        # Create entity
        entity = {
            "PartitionKey": partition_key,
            "RowKey": row_key,
            "Name": name,
            "Description": description,
            "Price": price,
            "ImageURL": image_url,
            "Availability": availability,
            "Timestamp": timestamp
        }

        # Insert or update entity
        table_client.upsert_entity(entity)

        return func.HttpResponse(
            json.dumps({"status": "Meal added successfully"}),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        logging.error(f"AddMeal error: {str(e)}")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=400,
            mimetype="application/json"
        )
