import json
import boto3
from flask import Flask, request, Response, jsonify
from flask_cors import CORS, cross_origin
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key, Attr

app = Flask(__name__)
CORS(app)

cognito_client = boto3.client('cognito-idp')
user_pool_id = 'us-east-1_k1xovBg3P'

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('User-Table')
advisor_table = dynamodb.Table('Advisor-Table')
advisor_application_table = dynamodb.Table('Advisor-Application-Table')


#http://127.0.0.1:5000/
@app.route('/')
@cross_origin()
def hello():
    return "Health Check!"

def email_exists(email):
    try:
        response = cognito_client.list_users(
            UserPoolId=user_pool_id,
            Filter=f'email = "{email}"',
        )
        return bool(response.get('Users'))
    except ClientError as e:
        print(f"An error occurred when checking the email: {e}")
        return False

#http://127.0.0.1:5000/users/register/<username>/<password>
@app.route('/users/register/<username>/<password>/<email>', methods = ['POST'])
@cross_origin()
def register_user(username, password, email):
    try:
        if not username or not password:
            return "Username, email, and password are required", 401
        
        if email_exists(email):
            return "Email already exists", 401
            
        cognito_client.sign_up(
            ClientId='73tr5iabe4sulif3qnqn0gthsu',
            Username=username,
            Password=password,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
            ]
        )

        user_table.put_item(Item={'username': username})


        return "User registered successfully", 200
    except cognito_client.exceptions.UsernameExistsException as e:
        return "Username already exists", 401
    except cognito_client.exceptions.InvalidPasswordException as e:
        return "Password does not meet requirements", 401
    except ClientError as e:
        return Response(response=json.dumps({"error": str(e)}), content_type='application/json', status=400)

    
#http://127.0.0.1:5000/advisors/register/<username>/<password>
@app.route('/advisors/register/<username>/<password>/<email>/<number>/<address>', methods = ['POST'])
@cross_origin()
def register_advisor_account(username, password, email, number, address):
    try:
        if not username or not password:
            return "Username, email, and password are required", 401
        
        if email_exists(email):
            return "Email already exists", 401
            
        cognito_client.sign_up(
            ClientId='73tr5iabe4sulif3qnqn0gthsu',
            Username=username,
            Password=password,
            UserAttributes=[
                {'Name': 'email', 'Value': email},
            ]
        )

        item = {
            'username': username,
            'phone_number': number,
            'address': address
        }

        advisor_application_table.put_item(Item = item)

        return "User registered successfully", 200
    except cognito_client.exceptions.UsernameExistsException as e:
        return "Username already exists", 401
    except cognito_client.exceptions.InvalidPasswordException as e:
        return "Password does not meet requirements", 401
    except ClientError as e:
        return "Method Not Allowed", 405





#http://127.0.0.1:5000/advisors/registerinformation/<username>/<password>
@app.route('/advisors/registerinformation/<username>/<number>/<address>', methods = ['POST'])
@cross_origin()
def register_advisor_information(username, number, address):
        data = request.json

        languages_set = set(data.get('languages', []))
        interests_set = set(data.get('interests', []))
        location = data.get('location')

        item = {
            'username': username,
            'phone_number': number,
            'address': address,
            'languages': list(languages_set),
            'interests': list(interests_set),
            'location': location
        }

        advisor_application_table.put_item(Item = item)

        return "Advisor Updated", 200



#http://127.0.0.1:5000/users/verify/<username>/<password>
@app.route('/users/verify/<username>/<password>', methods = ['GET'])
@cross_origin()
def user_login(username, password):
    if not username or not password:
        return "Username and password are required", 401
    
    try:
        response = cognito_client.initiate_auth(
            ClientId= '73tr5iabe4sulif3qnqn0gthsu',
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password,
            }
        )

        dynamo_response = user_table.query(KeyConditionExpression=boto3.dynamodb.conditions.Key('username').eq(username))
        items = dynamo_response.get('Items', [])

        if len(items) > 0:
            return "User exists and password is correct", 200
        else:
            return "User not yet approved", 404
    except cognito_client.exceptions.UserNotFoundException as e:
        return "User not found", 404
    except cognito_client.exceptions.NotAuthorizedException as e:
        return "Password is Incorrect", 402
    except ClientError as e:
        return "Method Not Allowed", 405

        
#http://127.0.0.1:5000/advisor/verify/<username>/<password>
@app.route('/advisors/verify/<username>/<password>', methods = ['GET'])
@cross_origin()
def advisor_login(username, password):
    if not username or not password:
        return "Username and password are required", 401
    try:
        response = cognito_client.initiate_auth(
            ClientId= '73tr5iabe4sulif3qnqn0gthsu',
            AuthFlow='USER_PASSWORD_AUTH',
            AuthParameters={
                'USERNAME': username,
                'PASSWORD': password,
            }
        )

        dynamo_response = advisor_table.query(KeyConditionExpression=boto3.dynamodb.conditions.Key('username').eq(username))
        items = dynamo_response.get('Items', [])

        if len(items) > 0:
            return "User exists and password is correct", 200
        else:
            return "User not yet approved", 404
    except cognito_client.exceptions.UserNotFoundException as e:
        return "User not found", 404
    except cognito_client.exceptions.NotAuthorizedException as e:
        return "Password is Incorrect", 402
    except ClientError as e:
        return "Method Not Allowed", 405
        
        

#http://127.0.0.1:5000/advisors/query
@app.route('/advisors/query', methods=['GET'])
@cross_origin()
def query_advisors():
    
    languages = request.args.get('languages')
    location = request.args.get('location')
    interests = request.args.get('interests')

    try:
        scan_args = {
            'FilterExpression': Attr('location').eq(location)
        }

        if languages:
            scan_args['FilterExpression'] = scan_args['FilterExpression'] & Attr('languages').contains(languages)

        if interests:
            for interest in interests.split(','):
                print(f"Key: {interest}")
                scan_args['FilterExpression'] = scan_args['FilterExpression'] & Attr('interests').contains(interest)

        response = advisor_table.scan(**scan_args)

        items = response.get('Items', [])
        return jsonify(items)

    except ClientError as e:
        print(f"An error occurred: {e}")
        return jsonify({"error": str(e)}), 500


#http://127.0.0.1:5000/advisors/getall
@app.route('/advisors/getall', methods = ['GET'])
@cross_origin()
def get_advisors():
    try:
        # Just get top 10 advisors
        response = advisor_table.scan(AttributesToGet=['username', 'location', 'interests', 'languages'], Limit = 10)
        items = response.get('Items', [])
        usernames = [item['username'] for item in items]
        print(usernames)
        #advisor_response = json.dumps(usernames)
        #return Response(response=advisor_response, content_type='application/json', status=200)
        return jsonify(items)
    except Exception as e:
        return Response(response=json.dumps({"error": str(e)}), content_type='application/json', status=500)

        


if __name__ == '__main__':
    app.run(debug = True)