import azure.functions as func
import logging
import json
import uuid
from datetime import datetime
import random
import os
from azure.data.tables import TableClient
from azure.storage.queue import QueueClient

def get_table_client(table_name: str) -> TableClient:
    connection_str = os.getenv("AzureWebJobsStorage")
    return TableClient.from_connection_string(conn_str=connection_str, table_name=table_name)

def get_queue_client(queue_name: str) -> QueueClient:
    connection_str = os.getenv("AzureWebJobsStorage")
    return QueueClient.from_connection_string(conn_str=connection_str, queue_name=queue_name)

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("SubmitOrder function called")

    try:
        body = req.get_json()
    except Exception:
        return func.HttpResponse(
            json.dumps({"error": "Invalid JSON body"}),
            status_code=400,
            mimetype="application/json"
        )

    restaurant_id = body.get("RestaurantID")
    meals = body.get("Meals")  # list of {MealID, Qty}
    customer_name = body.get("CustomerName", "Anonymous")
    customer_phone = body.get("CustomerPhone", "")
    area = body.get("Area", "Unknown")

    if not restaurant_id or not meals or not isinstance(meals, list):
        return func.HttpResponse(
            json.dumps({"error": "Missing RestaurantID or Meals list"}),
            status_code=400,
            mimetype="application/json"
        )

    try:
        meals_table = get_table_client("Meals")
        queue_client = get_queue_client(os.getenv("QUEUE_NAME", "orders"))

        order_items = []
        total_price = 0.0

        for item in meals:
            meal_id = item.get("MealID")
            qty = int(item.get("Qty", 1))
            if not meal_id:
                return func.HttpResponse(
                    json.dumps({"error": "Each meal must have a MealID"}),
                    status_code=400,
                    mimetype="application/json"
                )

            # Fetch meal info from table
            try:
                meal_entity = meals_table.get_entity(partition_key=restaurant_id, row_key=meal_id)
            except Exception:
                return func.HttpResponse(
                    json.dumps({"error": f"Meal {meal_id} not found in restaurant {restaurant_id}"}),
                    status_code=404,
                    mimetype="application/json"
                )

            price = float(meal_entity.get("Price", 0))
            total_price += price * qty
            order_items.append({
                "MealID": meal_id,
                "MealName": meal_entity.get("Name"),
                "Qty": qty,
                "UnitPrice": price,
                "LineTotal": round(price * qty, 2)
            })

        order_id = str(uuid.uuid4())
        created_at = datetime.utcnow().isoformat() + "Z"
        estimated_delivery_minutes = random.randint(15, 35)  # random 15-35 mins

        order_object = {
            "OrderID": order_id,
            "RestaurantID": restaurant_id,
            "Area": area,
            "CustomerName": customer_name,
            "CustomerPhone": customer_phone,
            "Items": order_items,
            "TotalPrice": round(total_price, 2),
            "CreatedAt": created_at,
            "EstimatedDeliveryMinutes": estimated_delivery_minutes
        }

        # Push order to queue
        queue_client.send_message(json.dumps(order_object))

        return func.HttpResponse(
            json.dumps({
                "message": "Order queued",
                "OrderID": order_id,
                "TotalPrice": round(total_price, 2),
                "EstimatedDeliveryMinutes": estimated_delivery_minutes
            }),
            status_code=201,
            mimetype="application/json"
        )

    except Exception as e:
        logging.exception("Error processing SubmitOrder")
        return func.HttpResponse(
            json.dumps({"error": str(e)}),
            status_code=500,
            mimetype="application/json"
        )
