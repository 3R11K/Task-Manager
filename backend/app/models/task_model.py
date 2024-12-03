from datetime import datetime
from app import db
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, BigInteger, JSON
from sqlalchemy.orm import relationship, backref
from sqlalchemy.types import DateTime
from sqlalchemy.dialects.postgresql import TIMESTAMP
# Definindo o modelo de Task com a chave estrangeira para a tabela Group
class Task(db.Model):
    __tablename__ = 'task'
    
    id = db.Column(BigInteger, primary_key=True, autoincrement=True)
    name = db.Column(String, nullable=False)
    description = db.Column(String)
    dor = db.Column(Text)  # Corrigido para tipo Text
    dod = db.Column(Text)  # Corrigido para tipo Text
    size = db.Column(String)
    assignee = db.Column(JSON)
    reviewer = db.Column(JSON)
    status = db.Column(String)
    due_date = db.Column(DateTime(timezone=True))
    pr_link = db.Column(String)
    story = db.Column(String)
    
    # Chave estrangeira para a tabela group
    id_group = db.Column(BigInteger, ForeignKey('group.id', ondelete='CASCADE'))
    
    # Relacionamento com a tabela Group
    group = db.relationship('Group', backref=backref('tasks', lazy=True))
    
    def serialize(self):
        """
        Converte o objeto Task para um formato JSON (dicionário).
        """
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "dor": self.dor,
            "dod": self.dod,
            "size": self.size,
            "assignee": self.assignee,
            "reviewer": self.reviewer,
            "status": self.status,
            "due_date": self.due_date,
            "pr_link": self.pr_link,
            "story": self.story
        }

    def update(self, data):
        """
        atualiza apenas os campos que foram passados no objeto data.
        
        """
        self.name = data.get('name', self.name)
        self.description = data.get('description', self.description)
        self.dor = data.get('dor', self.dor)
        self.dod = data.get('dod', self.dod)
        self.size = data.get('size', self.size)
        self.assignee = data.get('assignee', self.assignee)
        self.reviewer = data.get('reviewer', self.reviewer)
        self.status = data.get('status', self.status)
        self.due_date = data.get('due_date', self.due_date)
        self.pr_link = data.get('pr_link', self.pr_link)
        
        
    def __repr__(self):
        return f"<Task {self.id}, {self.name}>"
    
    