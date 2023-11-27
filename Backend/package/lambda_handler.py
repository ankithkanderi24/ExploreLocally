from aws_lambda_wsgi import wsgi_handler
from api import api  # Import your Flask app

def lambda_handler(event, context):
    return wsgi_handler(event, context, api)