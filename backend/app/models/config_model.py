from app import db
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, BigInteger, JSON
from marshmallow import Schema, fields, ValidationError

from marshmallow import Schema, fields, validate

class ConfigSchema(Schema):
    sizes = fields.Dict(
        keys=fields.String(validate=validate.OneOf(["G", "M", "P", "PP"])),
        values=fields.Integer(strict=True, validate=validate.Range(min=1)),
        required=True
    )
    colors = fields.Dict(
        keys=fields.String(validate=validate.OneOf(["G", "M", "P", "PP"])),
        values=fields.String(validate=validate.Regexp(r"^#[0-9a-fA-F]{6}$")),
        required=True
    )
    start_date = fields.DateTime(format="%d/%m/%Y", required=True)
    end_date = fields.DateTime(format="%d/%m/%Y", required=True)


config_schema = ConfigSchema()



class Config(db.Model):
    __tablename__ = 'config'
    
    id = db.Column(BigInteger, primary_key=True, autoincrement=True)
    config = db.Column(JSON)
    group_id = db.Column(BigInteger, ForeignKey('group.id', ondelete='CASCADE'))
    sprint_num = db.Column(Integer)
    sprint_name = db.Column(String(100))
    sprint_description = db.Column(Text) 
    
    group = db.relationship('Group', backref='config')
    
    def serialize(self):
        """
        Converte o objeto Config para um formato JSON (dicionário).
        """
        return {
            "id": self.id,
            "config": self.config,
            "sprint_num": self.sprint_num,
            "sprint_name": self.sprint_name,
            "sprint_description": self.sprint_description
        }
        
    def update(self, data):
        """
        Atualiza os dados da configuração.
        
        :param data: Dados da configuração (objeto Config)
        """
        try:
            config_schema.load(data)
            self.config = data
        except ValidationError as err:
            raise ValueError(f"Invalid config data: {err.messages}")
    
    def __repr__(self):
        return f"<Config {self.id}, >"