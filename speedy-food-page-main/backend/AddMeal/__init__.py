import azure.functions as func
import logging
import json
import os
from azure.data.tables import TableClient

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("AddMeal function called (placeholder).")

    try:
        body = req.get_json()
        restaurant_id = body["restaurant_id"]
        meal_id = body["meal_id"]
        name = body["name"]
        description = body.get("description", "")
        price = int(body["price"])
        image_url = body.get("image_url", "")

        table_client = TableClient.from_connection_string(
            conn_str=os.getenv("TABLE_CONN"),
            table_name="Meals"
        )

        entity = {
            "PartitionKey": restaurant_id,
            "RowKey": meal_id,
            "Name": name,
            "Description": description,
            "Price": price,
            "ImageURL": image_url
        }

        table_client.upsert_entity(entity)

        return func.HttpResponse(
            json.dumps({"status": "Meal added successfully"}),
            status_code=200,
            mimetype="application/json"
        )
    except Exception as e:
        logging.error(str(e))
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=400,
            mimetype="application/json"
        )
