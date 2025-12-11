import azure.functions as func
import logging
import json

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("SubmitOrder function called (placeholder).")
    try:
        order_data = req.get_json()
    except ValueError:
        order_data = {}
    response = {"message": "Order received (placeholder)", "order": order_data}
    return func.HttpResponse(
        json.dumps(response),
        status_code=200,
        mimetype="application/json"
    )
