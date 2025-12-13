import logging
import azure.functions as func
from azure.data.tables import TableClient
import os
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetRestaurants function called")
    
    connection_str = os.getenv("AzureWebJobsStorage")
    table_name = "restaurants"  # lowercase table

    try:
        table_client = TableClient.from_connection_string(conn_str=connection_str, table_name=table_name)
        restaurants = []

        for entity in table_client.list_entities():
            restaurants.append({
                "PartitionKey": entity.get("PartitionKey"),
                "RowKey": entity.get("RowKey"),
                "Name": entity.get("Name", ""),
                "Cuisine": entity.get("Cuisine", ""),
                "Rating": 5,  # all restaurants 5 stars
                "DeliveryTime": entity.get("DeliveryTime", ""),
                "DeliveryFee": entity.get("DeliveryFee", ""),
                "ImageURL": entity.get("ImageURL", ""),  # <- changed here
                "Featured": entity.get("Featured", False)
            })

        return func.HttpResponse(
            json.dumps({"restaurants": restaurants}),
            status_code=200,
            mimetype="application/json"
        )

    except Exception as e:
        logging.error(f"Error fetching restaurants: {e}")
        return func.HttpResponse(f"Error fetching restaurants: {str(e)}", status_code=500)
