import azure.functions as func
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetRestaurants function called (placeholder).")
    return func.HttpResponse(
        '{"restaurants": [{"PartitionKey": "NYC", "RowKey": "rest001", "Name": "Pizza Palace"}]}',
        status_code=200,
        mimetype="application/json"
    )
