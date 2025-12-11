import azure.functions as func
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetMeals function called (placeholder).")
    return func.HttpResponse(
        '{"meals": [{"PartitionKey": "rest001", "RowKey": "meal001", "MealName": "Pepperoni Pizza", "Price": 12.99}]}',
        status_code=200,
        mimetype="application/json"
    )
