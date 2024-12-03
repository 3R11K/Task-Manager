from app import db  # db é a instância de SQLAlchemy
from sqlalchemy import Column, BigInteger, String
from sqlalchemy.orm import relationship

class User(db.Model):  # Alterado para herdar de db.Model
    __tablename__ = 'user'  # Nome da tabela no banco

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    groups = relationship('Group', secondary='group_users', back_populates='users')

    def __init__(self, name, email, password):
        self.name = name
        self.email = email
        self.password = password

    @property
    def group(self):
        # Acessa o nome do primeiro grupo associado ao usuário
        return self.groups[0].name if self.groups else None
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "group": self.group
        }

    def __repr__(self):
        group_name = self.group  # Acessa a propriedade 'group'
        return f"<User(id={self.id}, name='{self.name}', email='{self.email}', group='{group_name}')>"
