import azure.functions as func
import logging
import json
from common.db import get_table_client
from typing import List, Dict

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetMealsByArea called")
    area = req.params.get("area")
    if not area:
        try:
            body = req.get_json()
            area = body.get("area")
        except Exception:
            area = None

    if not area:
        return func.HttpResponse(json.dumps({"error": "Missing 'area' query parameter or body"}), status_code=400, mimetype="application/json")

    try:
        restaurants_table = get_table_client("Restaurants")
        meals_table = get_table_client("Meals")

        # Query restaurants by PartitionKey == area
        restaurants = restaurants_table.query_entities(filter=f"PartitionKey eq '{area}'")
        restaurants_list = list(restaurants)

        all_meals: List[Dict] = []

        for rest in restaurants_list:
            rest_id = rest.get("RowKey")
            # Query meals where PartitionKey == rest_id (RestaurantID)
            meals = meals_table.query_entities(filter=f"PartitionKey eq '{rest_id}'")
            for m in meals:
                meal = {
                    "RestaurantID": rest_id,
                    "RestaurantName": rest.get("Name"),
                    "MealID": m.get("RowKey"),
                    "MealName": m.get("MealName"),
                    "Description": m.get("Description"),
                    "Price": m.get("Price"),
                    "ImageUrl": m.get("ImageUrl"),
                    "Available": m.get("Available", True)
                }
                all_meals.append(meal)

        return func.HttpResponse(json.dumps({"meals": all_meals}), status_code=200, mimetype="application/json")
    except Exception as e:
        logging.exception("Error in GetMealsByArea")
        return func.HttpResponse(json.dumps({"error": str(e)}), status_code=500, mimetype="application/json")
