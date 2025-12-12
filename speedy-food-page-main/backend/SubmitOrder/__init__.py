import azure.functions as func
import logging
import json
import uuid
from common.db import get_table_client, get_queue_client
from datetime import datetime

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("SubmitOrder called")
    try:
        body = req.get_json()
    except Exception:
        return func.HttpResponse(json.dumps({"error": "Invalid JSON body"}), status_code=400, mimetype="application/json")

    # Expecting: RestaurantID, Meals: [{MealID, Qty}], CustomerName, CustomerPhone, Area
    restaurant_id = body.get("RestaurantID")
    meals = body.get("Meals")  # list of {MealID, Qty}
    customer_name = body.get("CustomerName")
    customer_phone = body.get("CustomerPhone")
    area = body.get("Area")

    if not restaurant_id or not meals or not isinstance(meals, list):
        return func.HttpResponse(json.dumps({"error": "Missing RestaurantID or Meals list"}), status_code=400, mimetype="application/json")

    try:
        meals_table = get_table_client("Meals")
        queue_name = (req.headers.get("x-queue-name") or None)  # optional override
        if not queue_name:
            from os import getenv
            queue_name = getenv("QUEUE_NAME") or "orders"
        queue_client = get_queue_client(queue_name)

        order_items = []
        total_price = 0.0

        # Validate meals and compute price
        for item in meals:
            mid = item.get("MealID")
            qty = int(item.get("Qty", 1))
            if not mid:
                return func.HttpResponse(json.dumps({"error": "Each meal must have a MealID"}), status_code=400, mimetype="application/json")

            try:
                m = meals_table.get_entity(partition_key=restaurant_id, row_key=mid)
            except Exception:
                return func.HttpResponse(json.dumps({"error": f"Meal {mid} not found for restaurant {restaurant_id}"}), status_code=404, mimetype="application/json")

            price = float(m.get("Price") or 0.0)
            total_price += price * qty
            order_items.append({
                "MealID": mid,
                "MealName": m.get("MealName"),
                "Qty": qty,
                "UnitPrice": price,
                "LineTotal": price * qty
            })

        order_id = str(uuid.uuid4())
        created_at = datetime.utcnow().isoformat() + "Z"

        order_object = {
            "OrderID": order_id,
            "RestaurantID": restaurant_id,
            "Area": area,
            "CustomerName": customer_name,
            "CustomerPhone": customer_phone,
            "Items": order_items,
            "TotalPrice": round(total_price, 2),
            "CreatedAt": created_at
        }

        # Send to queue (message body must be str)
        queue_client.send_message(json.dumps(order_object))

        return func.HttpResponse(json.dumps({"message": "Order queued", "OrderID": order_id, "TotalPrice": round(total_price,2)}), status_code=201, mimetype="application/json")
    except Exception as e:
        logging.exception("Error in SubmitOrder")
        return func.HttpResponse(json.dumps({"error": str(e)}), status_code=500, mimetype="application/json")
