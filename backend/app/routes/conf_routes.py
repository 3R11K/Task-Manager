from flask import Blueprint, request, jsonify
from app.utils.auth import Auth
from app.services.database import Database

conf_routes = Blueprint('conf_routes', __name__, url_prefix='/conf')

auth = Auth()

db = Database()

@conf_routes.route("/get_conf", methods=["GET"])
@auth.token_required
def get_conf(user):
    """
    Rota para obter as configurações do usuário.
    """
    user_conf = db.get_group_conf(user)
    return jsonify(user_conf.serialize()), 200

@conf_routes.route("/update_conf", methods=["POST"])
@auth.token_required
def update_conf(user):
    """
    Rota para atualizar as configurações do usuário.
    """
    data = request.get_json()
    new_conf = data.get("conf")

    if not new_conf:
        return jsonify({"message": "Configuration object is required."}), 400

    updated_conf = db.update_group_conf(user, new_conf)
    return jsonify(updated_conf.serialize()), 200