from flask import Blueprint, request, jsonify
from app.utils.auth import Auth
from app.services.database import Database

# Criando um Blueprint com o prefixo '/api'
task_routes = Blueprint('task_routes', __name__, url_prefix='/tasks')
auth = Auth()
db = Database()

@task_routes.route('/create', methods=['POST'])
@auth.token_required
def create_task(user):
    """
    Permite criar uma nova tarefa associada ao usuário autenticado.
    """
    data = request.get_json()
    
    task = {
        "name": data.get('name'),
        "description": data.get('description', ''),
        "dor": data.get('dor', ''),
        "dod": data.get('dod', ''),
        "size": data.get('size'),
        "assignee": data.get('assignee'),
        "reviewer": data.get('reviewer', ''),
        "status": data.get('status'),
        "due_date": data.get('due_date'),
        "pr_link": data.get('pr_link', ''),
        "story": data.get('story', ''),
        "sprint": data.get('sprint', '')
    }

    if not task["name"] or not task["size"] or not task["assignee"] or not task["status"] or not task["due_date"] or not task["story"]:
        return jsonify({"message": "Fields name, size, assignee, status and story are musted "}), 400

    # Chama a função para criar a tarefa e armazena a tupla (task_object, error_message)
    task_object, error = db.create_task(user, task)

    if error:
        return jsonify({"message": error}), 400

    return jsonify({"message": "Task created successfully.", "task": task_object.serialize()}), 201

@task_routes.route('/list', methods=['GET'])
@auth.token_required
def list_tasks(user):
    """
    Permite listar todas as tarefas associadas ao usuário autenticado.
    """
    try:
        tasks, error = db.get_group_tasks(user)
        if error:
            return jsonify({"message": error}), 400

        tasks = [task.serialize() for task in tasks]
        return jsonify({"tasks": tasks}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@task_routes.route('/update/<int:task_id>', methods=['PUT'])
@auth.token_required
def update_task(user, task_id):
    """
    Permite atualizar uma tarefa associada ao usuário autenticado.
    """
    
    print(user)
    print(task_id)
    
    data = request.get_json()
    
    task = {
        "name": data.get('name'),
        "description": data.get('description'),
        "dor": data.get('dor'),
        "dod": data.get('dod'),
        "size": data.get('size'),
        "assignee": data.get('assignee'),
        "reviewer": data.get('reviewer'),
        "status": data.get('status'),
        "due_date": data.get('due_date'),
        "pr_link": data.get('pr_link'),
        "story": data.get('story'),
    }
    #Story, assignee, size, status, due_date são obrigatórios
    if not task["name"] or not task["size"] or not task["assignee"] or not task["status"] or not task["due_date"] or not task["story"]:
        return jsonify({"message": "Fields name, size, assignee, status and story are musted "}), 400
    # Chama a função para atualizar a tarefa e armazena a tupla (task_object, error_message)
    task_object, error = db.update_task(user, task_id, task)

    if error:
        return jsonify({"message": error}), 400

    return jsonify({"message": "Task updated successfully.", "task": task_object.serialize()}), 200

@task_routes.route('/update/status/<int:task_id>', methods=['PUT'])
@auth.token_required
def update_task_status(user, task_id):
    """
    Permite atualizar o status de uma tarefa associada ao usuário autenticado.
    """
    data = request.get_json()
    
    status = data.get('status')

    # Chama a função para atualizar o status da tarefa e armazena a tupla (task_object, error_message)
    task_object, error = db.update_task_status(user, task_id, status)

    if error:
        return jsonify({"message": error}), 400

    return jsonify({"message": "Task status updated successfully.", "task": task_object.serialize()}), 200

@task_routes.route('/updates/status', methods=['PUT'])  
@auth.token_required
def update_tasks_status(user):
    """
    Permite atualizar o status de várias tarefas associadas ao usuário autenticado.
    """
    data = request.get_json()
    
    tasks = data.get('tasks')
    
    # tasks = [{"id": 1, "status": "done"}, {"id": 2, "status": "done"}]
    
    # Chama a função para atualizar o status das tarefas e armazena a tupla (tasks_objects, error_message)
    tasks_objects, error = db.update_tasks_status(user, tasks)
    
    if error:
        return jsonify({"message": error}), 400
    
    return jsonify({"message": "Tasks status updated successfully.", "tasks": tasks_objects}), 200
    
    
    

