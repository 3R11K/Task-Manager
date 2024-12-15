from flask import Blueprint, request, jsonify
from app.utils.auth import Auth
from app.services.database import Database

# Criando um Blueprint com o prefixo '/api'
user_routes = Blueprint('user_routes', __name__, url_prefix='/users')
auth = Auth()
db = Database()

@user_routes.route('/define-group', methods=['POST'])
@auth.token_required
def define_group(user):
    """
    Permite que o usuário se associe a um grupo existente, validando o nome do grupo e a senha.
    """
    # Obtém os dados do grupo do corpo da requisição
    data = request.get_json()
    
    name = data.get('name')
    password = data.get('password')

    if not name or not password:
        return jsonify({"message": "Group name and password are required."}), 400

    # Chama o método da classe Database para definir o grupo
    group, error_message = db.define_group(user, name, password)
    if error_message:
        return jsonify({"message": error_message}), 403

    return jsonify({"message": "You have been successfully added to the group.", "group": {"id": group.id, "name": group.name}}), 200

@user_routes.route('/create-group', methods=['POST'])
@auth.token_required
def create_group(user):
    """
    Permite criar um novo grupo e associar o usuário ao grupo, verificando se o grupo já existe.
    """
    # Verifica se o usuário já pertence a algum grupo
    user_groups = auth.db_service.get_user_groups(user.id)
    if user_groups:
        return jsonify({"message": "You are already associated with a group.", "groups": [g.name for g in user_groups]}), 403

    # Obtém os dados do grupo do corpo da requisição
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')

    if not name or not password:
        return jsonify({"message": "Group name and password are required."}), 400

    # Verifica se o grupo já existe
    existing_group = auth.db_service.get_group_by_name(name)
    if existing_group:
        return jsonify({"message": "Group with this name already exists."}), 400

    # Cria o novo grupo e associa ao usuário
    new_group = auth.db_service.create_group_for_user(user.id, name, password)

    return jsonify({
        "message": "Group created and you have been added to it.",
        "group": {"id": new_group.id, "name": new_group.name}
    }), 201