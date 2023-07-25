import os
from flask import Flask, request, jsonify, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from api.models import db, User
import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    rb=request.get_json()
    email = rb["email"]
    password = rb["password"]
    user=User.query.filter_by(email=email).first()

    if user:
        return jsonify(message='Email already registered'), 409
    new_user = User(email=rb["email"], password=rb["password"], is_active=True)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message='User register succssfully'), 200
    except Exception as e:
        db.session.rollback()
        return jsonify(message=e), 200
@api.route('/login', methods=['POST'])
def login():
    get_login = request.get_json()
    email = get_login["email"]
    password = get_login["password"]

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400
    
    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({'message': 'Invalid credential'}), 401
    
    expiration = datetime.timedelta(days=3)
    access_token = create_access_token(identity= user.id, expires_delta= expiration)
    return jsonify({'message': 'Logged in successfully.', 'access_token':access_token}), 200