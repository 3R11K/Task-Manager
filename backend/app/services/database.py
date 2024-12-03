from app.models.user_model import User
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.group_model import Group
from app.models.task_model import Task
from app.models.config_model import Config
from app import db
import json

class Database:
    def __init__(self):
        # Não é necessário passar 'app' para o db, porque o db já foi configurado globalmente
        pass


    def create_user(self, user):
        # Criação de um novo usuário
        db.session.add(user)
        db.session.commit()
        return user

    def get_all_users(self):
        # Buscar todos os usuários
        return User.query.all()

    def get_user_by_email(self, email):
        # Buscar usuário pelo email
        user = User.query.filter_by(email=email).first()
        
        print("user", user)
        return user
    
    def get_user_by_id(self, user_id):
        # Buscar usuário pelo id
        return User.query.get(user_id)
    
    def get_user_groups(self, user_id):
        user = self.get_user_by_id(user_id)
        if user:
            return user.groups  # Não é necessário chamar .all() aqui
        return []
    
    def define_group(self, user, group_name, group_password):
        """
        Associa um usuário a um grupo existente, validando as credenciais do grupo.
        """
        
        if not user:
            return None, "User not found."

        user_groups = user.groups
        if user_groups:
            return None, "User is already associated with a group."

        # Verifica as credenciais do grupo
        print("group_name", group_name)
        print("group_password", group_password)
        group = db.session.query(Group).filter(Group.name == group_name).first()
        if not group or not check_password_hash(group.password, group_password):
            return None, "Invalid group name or password."

        # Associa o usuário ao grupo
        user.groups.append(group)
        db.session.commit()
        return group, None
    
    def verify_group_credentials(self, group_name, password):
        """
        Verifica se o nome do grupo e a senha correspondem.
        """
        group = self.get_group_by_name(group_name)
        if group and check_password_hash(group.password, password):
            return group
        return None

    def create_group_for_user(self, user_id, group_name, group_password):
        """
        Cria um novo grupo e associa o usuário a ele.
        """
        # Cria o grupo com a senha hashada
        new_group = Group(
            name=group_name,
            password=generate_password_hash(group_password)  # Armazena a senha de forma segura
        )
        db.session.add(new_group)
        db.session.commit()

        # Associa o usuário ao grupo
        user = User.query.get(user_id)
        user.groups.append(new_group)
        db.session.commit()

        return new_group
    
    def get_group_by_name(self, group_name):
        # Buscar grupo pelo nome
        return Group.query.filter_by(name=group_name).first()

    @staticmethod
    def get_user_group_id(user):
        """
        Retorna o 'group_id' associado ao usuário.

        :param user: Instância do usuário (objeto User)
        :return: group_id (ID do grupo associado ao usuário)
        """
        if not user.groups:
            return None  # Se o usuário não tiver grupos associados, retorna None

        # Se o usuário tem grupos, vamos pegar o ID do primeiro grupo
        # (ou adapte para pegar de acordo com a lógica que preferir, caso o usuário tenha vários grupos)
        return user.groups[0].id

    
    def get_group_tasks(self, user):
        """
        Retorna todas as tarefas associadas ao grupo do usuário.

        :param user: Instância do usuário (objeto User)
        :return: lista de tarefas ou mensagem de erro
        """
        # Obter o group_id do usuário
        group_id = self.get_user_group_id(user)

        if not group_id:
            return [], "User has no group"

        # Buscar todas as tarefas associadas ao group_id
        tasks = db.session.query(Task).filter(Task.id_group == group_id).all()

        return tasks, None  # Retorna as tarefas e sem erro
    
    def create_task(self, user, task_data):
        """
        Cria uma nova tarefa associada ao grupo do usuário.

        :param user: Instância do usuário (objeto User)
        :param task_data: Dados da tarefa (objeto Task)
        :return: tarefa criada ou mensagem de erro
        """
        # Obter o group_id do usuário
        group_id = self.get_user_group_id(user)
        if not group_id:
            return None, "User has no group"
        
        # Obter os usuários do grupo
        group, error = self.get_group_users(group_id)
        if error:
            return None, error  # Retorna erro se não encontrar o grupo
        
        users = [user.id for user in group]  # Lista de IDs dos usuários do grupo

        # Verificando e extraindo assignee e reviewer
        assignee_id = self.get_user_id_from_input(task_data.get("assignee"))
        reviewer_id = self.get_user_id_from_input(task_data.get("reviewer"))
        
        # Verificando se assignee e reviewer estão no grupo
        if assignee_id not in users:
            return None, "Assignee not in group"
        if reviewer_id not in users:
            return None, "Reviewer not in group"

        # Criar a nova tarefa associada ao group_id
        new_task = Task(id_group=group_id, **task_data)
        db.session.add(new_task)
        db.session.commit()

        return new_task, None


    @staticmethod
    def get_user_id_from_input(data):
        """Verifica se a entrada é um dicionário ou string e retorna o ID"""
        if isinstance(data, str):  # Caso a entrada seja string
            data = json.loads(data.replace("'", "\""))  # Converte para dicionário
        return data.get("id") if isinstance(data, dict) else data
    
    def get_group_users(self, group_id):
        """
        Retorna todos os usuários associados ao grupo.

        :param group_id: ID do grupo
        :return: lista de usuários ou mensagem de erro
        """
        group = Group.query.get(group_id)
        if not group:
            return [], "Group not found"

        return group.users, None
    
    def get_group_conf(self, user):
        """
        Retorna a configuração associada ao grupo do usuário.

        :param user: Instância do usuário (objeto User)
        :return: Configuração do grupo ou mensagem de erro
        """
        group_id = self.get_user_group_id(user)
        if not group_id:
            return None, "User has no group"

        # Certifique-se de usar 'group_id' conforme definido no modelo Config
        config = Config.query.filter_by(group_id=group_id).first()

        return config

    def update_group_conf(self, user, data):
        """
        Atualiza a configuração associada ao grupo do usuário.

        :param user: Instância do usuário (objeto User)
        :param data: Dados da configuração (objeto Config)
        :return: nova configuração ou mensagem de erro
        """
        group_id = self.get_user_group_id(user)
        if not group_id:
            return None, "User has no group"

        # Atualiza a configuração do grupo
        config = Config.query.filter_by(group_id=group_id).first()
        if not config:
            #insert new config
            config = Config(group_id=group_id, config=data)
            db.session.add(config)
            db.session.commit()
            return config

        config.update(data)
        db.session.commit()

        return config
    
    def get_group_tasks(self, user):
        """
        Retorna todas as tarefas associadas ao grupo do usuário.

        :param user: Instância do usuário (objeto User)
        :return: lista de tarefas ou mensagem de erro
        """
        group_id = self.get_user_group_id(user)
        if not group_id:
            return [], "User has no group"

        tasks = Task.query.filter_by(id_group=group_id).all()

        return tasks, None
    
    def update_task(self, user, task_id, data):
        """
        Atualiza uma tarefa associada ao grupo do usuário.

        :param user: Instância do usuário (objeto User)
        :param task_id: ID da tarefa
        :param data: Dados da tarefa (objeto Task)
        :return: tarefa atualizada ou mensagem de erro
        """
        group_id = self.get_user_group_id(user)
        if not group_id:
            return None, "User has no group"

        task = Task.query.filter_by(id=task_id, id_group=group_id).first()
        if not task:
            return None, "Task not found"

        task.update(data)
        db.session.commit()

        return task, None
    
    def get_group_members(self, user):
        #use serialize of Group model
        group_id = self.get_user_group_id(user)
        if not group_id:
            return [], "User has no group"
        
        group = Group.query.get(group_id)
        return group.serialize()["users"], None
    
    def update_tasks_status(self, user, tasks):
        """
        Atualiza o status de varias tasks, vindo no formato tasks = [{"id": 1, "status": "done"}, ...]
        """
        
        group_id = self.get_user_group_id(user)
        if not group_id:
            return None, "User has no group"

        for task in tasks:
            task_id = task.get("id")
            status = task.get("status")
            task = Task.query.filter_by(id=task_id, id_group=group_id).first()
            if task:
                task.status = status
                db.session.commit()
            else:
                return None, "Task not found"

        return tasks, None
    
        