import logging
import azure.functions as func
from azure.data.tables import TableClient
import os
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetMeals function called")

    connection_str = os.getenv("AzureWebJobsStorage")
    table_name = "meals"  # meals table
    restaurant_id = req.params.get("restaurantId", "").strip()

    try:
        table_client = TableClient.from_connection_string(conn_str=connection_str, table_name=table_name)
        meals = []

        for entity in table_client.list_entities():
            # Filter by PartitionKey if restaurantId is provided
            if restaurant_id and entity.get("PartitionKey") != restaurant_id:
                continue

            # Logging each meal for debugging
            logging.info(f"Meal: {entity.get('Name', '')} - PartitionKey: {entity.get('PartitionKey')} - ImageURL: {entity.get('ImageURL')}")

            meals.append({
                "Name": entity.get("Name", ""),
                "Description": entity.get("Description", ""),
                "Price": entity.get("Price", 0),
                "ImageURL": entity.get("ImageURL", "")  # use table's image URL; empty string if missing
            })

        return func.HttpResponse(
            json.dumps({"meals": meals}),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        logging.error(f"Error fetching meals: {e}")
        return func.HttpResponse(f"Error fetching meals: {str(e)}", status_code=500)
