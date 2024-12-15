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
    
    if user_conf == None:
        return jsonify({"message": "User has no configuration."}), 404
    
    return jsonify({"confs": [conf.serialize() for conf in user_conf]}), 200

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

@conf_routes.route("/set_conf", methods=["POST"])
@auth.token_required
def set_conf(user):
    try:
        data = request.get_json()
        
        new_conf = data.get("conf")
        
        curr_conf = db.get_group_conf(user)
        
        if curr_conf == None:   
            db.create_group_conf(user, new_conf)
        else:
            db.update_group_conf(user, new_conf)
            
        return jsonify({"message": "Configuration updated."}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@conf_routes.route("/add-sprint", methods=["POST"])
@auth.token_required
def add_sprint(user):
    try:
        data = request.get_json()
        
        sprint = data.get("sprint")
        
        try:
            new_sprint = db.add_sprint(user, sprint)
            return jsonify(new_sprint), 200
        except ValueError as e:
            return jsonify({"message": str(e)}), 400
    except Exception as e:
        return jsonify({"message": str(e)}), 400
