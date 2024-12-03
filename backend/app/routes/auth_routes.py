from flask import Blueprint, request, jsonify
from app.utils.auth import Auth

# Criando um Blueprint com o prefixo '/api'
auth_routes = Blueprint('auth_routes', __name__, url_prefix='/auth')
auth = Auth()

@auth_routes.route('/register', methods=['POST'])
def register():
    """
    Rota para registrar um novo usuário.
    """
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    # Validação simples
    if not name or not email or not password:
        return jsonify({"message": "All fields are required."}), 400

    # Registrar o usuário
    response, status_code = auth.register_user(name, email, password)
    return jsonify(response), status_code

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Rota para autenticar um usuário.
    """
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Validação simples
    if not email or not password:
        return jsonify({"message": "Email and password are required."}), 400

    # Autenticar o usuário
    response = auth.login_user(email, password)
    return response