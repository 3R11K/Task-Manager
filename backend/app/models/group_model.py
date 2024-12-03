from sqlalchemy import Table, Column, ForeignKey, BigInteger, String
from sqlalchemy.orm import relationship
from app import db  # db é a instância de SQLAlchemy

# Tabela de associação para a relação muitos-para-muitos
group_users = Table(
    'group_users',  # Nome da tabela
    db.metadata,  # Usando db.metadata ao invés de db.Base.metadata
    Column('id_group', BigInteger, ForeignKey('group.id', ondelete="CASCADE"), primary_key=True),
    Column('id_user', BigInteger, ForeignKey('user.id', ondelete="CASCADE"), primary_key=True)
)

class Group(db.Model):  # Alterado para herdar de db.Model
    __tablename__ = 'group'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)

    # Relacionamento com usuários
    users = relationship('User', secondary=group_users, back_populates='groups')
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "users": [user.serialize() for user in self.users]
        }
