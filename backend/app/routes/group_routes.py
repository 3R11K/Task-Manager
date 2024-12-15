from flask import Blueprint, request, jsonify
from app.utils.auth import Auth
from app.services.database import Database

group_routes = Blueprint('group_routes', __name__, url_prefix='/group')

auth = Auth()

db = Database()

@group_routes.route('/members', methods=['GET'])
@auth.token_required
def get_members(user):
    """
    Rota para obter os membros do grupo do usuário autenticado.
    """
    members = db.get_group_members(user)
    return jsonify(members), 200

@group_routes.route('/get-groups', methods=['GET'])
@auth.token_required
def get_groups(user):
    """
    Rota para obter os grupos do usuário autenticado.
    """
    groups = db.get_groups()
    return jsonify(groups), 200