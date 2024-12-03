from flask import jsonify, make_response
from app.services.database import Database
from werkzeug.security import check_password_hash, generate_password_hash
from app.models.group_model import Group
from app.models.user_model import User
from flask import request
from functools import wraps
import jwt
import datetime
from config import SECRET_KEY

class Auth:
    def __init__(self):
        self.db_service = Database()  # Não precisa passar o app aqui
        
    # Função para verificar o token e autenticar o usuário
    def token_required(self, f):
        """
        Decorador para proteger rotas que necessitam de autenticação JWT.
        """
        @wraps(f)
        def decorated_function(*args, **kwargs):
            token = request.cookies.get('access_token')  # Acessa o token do cookie
            print("token:",token)
            if not token:
                return jsonify({'message': 'Token is missing!'}), 403

            user_data = self.verify_token(token)
            if not user_data:
                return jsonify({'message': 'Token is invalid or expired!'}), 403
            print(user_data)
            
            # Adiciona o id do usuário ao contexto da requisição
            user = self.db_service.get_user_by_email(user_data['email'])
            if not user:
                return jsonify({'message': 'User not found!'}), 404

            return f(user, *args, **kwargs)

        return decorated_function


    # Função para gerar token JWT
    def generate_token(self, user):
        """
        Gera um token JWT para o usuário autenticado.
        """
        expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)  # Token válido por 1 hora
        print(user)
        payload = {
            'user_id': user.id,
            'name': user.name,
            'email': user.email,
            'group': user.group,
            'exp': expiration_time
        }
        
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return token

    # Função para verificar a validade do token
    def verify_token(self, token):
        """
        Verifica o token JWT e retorna as informações do payload, se válido.
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None  # Token expirado
        except jwt.InvalidTokenError:
            return None  # Token inválido
        
    def register_user(self, name, email, password):
        """
        Registra um novo usuário no banco de dados.
        """
        user = self.db_service.get_user_by_email(email)
        if user:
            return {"message": "User already exists."}, 400

        user = User(
            name=name,
            email=email,
            password=generate_password_hash(password)
        )
        new_user = self.db_service.create_user(user)
        return {"message": "User created successfully."}, 201

    
    def login_user(self, email, password):
        """
        Autentica um usuário no sistema e retorna o token no cookie.
        """
        user = self.db_service.get_user_by_email(email)
        if not user:
            return {"message": "User not found."}, 404

        if not check_password_hash(user.password, password):
            return {"message": "Invalid password."}, 401

        token = self.generate_token(user)
        
        # Criação de uma resposta com o token no cookie
        response = make_response({"message": "Login successful."}, 200)
        response.set_cookie(
                'access_token',
                token,
                secure=False,  # Para desenvolvimento local, sem HTTPS
                max_age=3600,
                samesite='Lax'  # Tente 'Lax' ou 'Strict' para testes locais
            )





        return response
