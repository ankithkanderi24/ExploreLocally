import json
import boto3
from flask import Flask, request, Response
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

dynamodb = boto3.resource('dynamodb')
user_table = dynamodb.Table('User-Table')
advisor_table = dynamodb.Table('Advisor-Table')


#http://127.0.0.1:5000/
@app.route('/')
@cross_origin()
def hello():
    return "Health Check!"

#http://127.0.0.1:5000/users/register/<username>/<password>
@app.route('/users/register/<username>/<password>', methods = ['POST'])
@cross_origin()
def register_user(username, password):
    if request.method == 'POST':
        if not username or not password:
            return "Username and password required", 401

        response = user_table.get_item(Key={'username': username})

        if 'Item' in response:
            return "Username already exists", 201

        user_table.put_item(Item={'username': username, 'password': password})

        return "User registered successfully", 400
    else:
        return "Method Not Allowed", 405
    
#http://127.0.0.1:5000/advisors/register/<username>/<password>
@app.route('/advisors/register/<username>/<password>', methods = ['POST'])
@cross_origin()
def register_advisor(username, password):
    if request.method == 'POST':
        if not username or not password:
            return "Username and password required", 401

        response = advisor_table.get_item(Key={'username': username})

        if 'Item' in response:
            return "Username already exists", 201

        advisor_table.put_item(Item={'username': username, 'password': password})

        return "Advisor registered successfully", 400
    else:
        return "Method Not Allowed", 405


#http://127.0.0.1:5000/users/verify/<username>/<password>
@app.route('/users/verify/<username>/<password>', methods = ['GET'])
@cross_origin()
def verify_user(username, password):
        if not username:
            return "Username required", 401

        response = user_table.get_item(Key={'username': username})

        if 'Item' in response:
            stored_password = response['Item']['password']
            if password == stored_password:
                return "User exists and password is correct", 200
            else:
                return "Password is incorrect", 402
        else:
            return "User not found", 404
        
#http://127.0.0.1:5000/advisor/verify/<username>/<password>
@app.route('/advisor/verify/<username>/<password>', methods = ['GET'])
@cross_origin()
def verify_advisor(username, password):
        if not username:
            return "Username required", 401

        response = advisor_table.get_item(Key={'username': username})

        if 'Item' in response:
            stored_password = response['Item']['password']
            if password == stored_password:
                return "User exists and password is correct", 200
            else:
                return "Password is incorrect", 402
        else:
            return "User not found", 404
        
#http://127.0.0.1:5000/advisor/getall
@app.route('/advisor/getall', methods = ['GET'])
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