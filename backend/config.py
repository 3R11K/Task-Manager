from dotenv import load_dotenv
from sqlalchemy.ext.declarative import declarative_base
import os

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

# Definir a base do SQLAlchemy para os modelos
Base = declarative_base()

# Configuração da URL do banco de dados
SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
SQLALCHEMY_TRACK_MODIFICATIONS = False  # Desativa o rastreamento de modificações (opcional)

SECRET_KEY = os.getenv("SECRET_KEY") 

