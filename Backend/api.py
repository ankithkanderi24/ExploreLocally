import json
import boto3
from flask import Flask, request, Response, jsonify
from flask_cors import CORS, cross_origin
from botocore.exceptions import ClientError

app = Flask(__name__)
CORS(app)

cognito_client = boto3.client('cognito-idp')
user_pool_id = 'us-east-1_k1xovBg3P'

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('User-Table')
advisor_table = dynamodb.Table('Advisor-Table')


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
@app.route('/advisors/register/<username>/<password>/<email>', methods = ['POST'])
@cross_origin()
def register_advisor_account(username, password, email):
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
        advisor_table.put_item(Item={'username': username})

        return "User registered successfully", 200
    except cognito_client.exceptions.UsernameExistsException as e:
        return "Username already exists", 401
    except cognito_client.exceptions.InvalidPasswordException as e:
        return "Password does not meet requirements", 401
    except ClientError as e:
        return "Method Not Allowed", 405


#http://127.0.0.1:5000/advisors/registerinformation/<username>/<password>
@app.route('/advisors/registerinformation/<username>', methods = ['POST'])
@cross_origin()
def register_advisor_information(username):
        data = request.json

        languages = data.get('languages')
        interests = data.get('interests')
        location = data.get('location')

        item = {
            'username': username,
            'languages': languages,
            'interests': interests,
            'location': location, 
            'rating': 0, 
            'rating_num': 0
        }

        advisor_table.put_item(Item = item)

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

        return "User exists and password is correct", 200 
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
        return "User exists and password is correct", 200 
    except cognito_client.exceptions.UserNotFoundException as e:
        return "User not found", 404
    except cognito_client.exceptions.NotAuthorizedException as e:
        return "Password is Incorrect", 402
    except ClientError as e:
        return "Method Not Allowed", 405
        
        




#http://127.0.0.1:5000/advisor/getall
@app.route('/advisors/getall', methods = ['GET'])
@cross_origin()
def get_advisors():
    try:
        response = advisor_table.scan(AttributesToGet=['username'])
        items = response.get('Items', [])
        usernames = [item['username'] for item in items]
        print(usernames)
        advisor_response = json.dumps(usernames)
        return Response(response=advisor_response, content_type='application/json', status=200)
    except Exception as e:
        return Response(response=json.dumps({"error": str(e)}), content_type='application/json', status=500)

        


if __name__ == '__main__':
    app.run(debug = True)