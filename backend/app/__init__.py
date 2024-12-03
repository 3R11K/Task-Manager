from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import SQLALCHEMY_DATABASE_URI
from flask_cors import CORS

# Instância global do SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'  # Política padrão recomendada para cookies
    app.config['SESSION_COOKIE_SECURE'] = False    # Em produção, altere para True (exige HTTPS)

    
    # Inicializa o db com a aplicação
    db.init_app(app)
    
    # Configurar o CORS para permitir localhost:3000
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
    
    # Importar as rotas depois da criação da app
    from app.routes.user_routes import user_routes
    from app.routes.auth_routes import auth_routes
    from app.routes.task_routes import task_routes
    from app.routes.conf_routes import conf_routes
    from app.routes.group_routes import group_routes
    
    app.register_blueprint(user_routes)
    app.register_blueprint(auth_routes)
    app.register_blueprint(task_routes)
    app.register_blueprint(conf_routes)
    app.register_blueprint(group_routes)

    return app
