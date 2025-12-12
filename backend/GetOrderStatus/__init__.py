import azure.functions as func
import logging

def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("GetOrderStatus function called (placeholder).")
    return func.HttpResponse(
        '{"status": "Order status placeholder"}',
        status_code=200,
        mimetype="application/json"
    )
