from app import db
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, BigInteger, JSON

class Config(db.Model):
    __tablename__ = 'config'
    
    id = db.Column(BigInteger, primary_key=True, autoincrement=True)
    config = db.Column(JSON)
    group_id = db.Column(BigInteger, ForeignKey('group.id', ondelete='CASCADE'))
    
    group = db.relationship('Group', backref='config')
    
    def serialize(self):
        """
        Converte o objeto Config para um formato JSON (dicionário).
        """
        return {
            "config": self.config
        }
        
    def update(self, data):
        """
        Atualiza os dados da configuração.
        
        :param data: Dados da configuração (objeto Config)
        """
        self.config = data
    
    def __repr__(self):
        return f"<Config {self.id}, >"
    
    