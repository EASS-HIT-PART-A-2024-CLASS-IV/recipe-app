from sqlalchemy import Table, Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from services.db_service import DatabaseService

Base = DatabaseService.Base

user_favorites = Table('user_favorites', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('recipe_id', Integer, ForeignKey('recipes.id'), primary_key=True)
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    hashed_password = Column(String)
    favorite_recipes = relationship("Recipe", secondary=user_favorites, back_populates="favorited_by")

class Recipe(Base):
    __tablename__ = 'recipes'
    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    favorited_by = relationship("User", secondary=user_favorites, back_populates="favorite_recipes")

    def __init__(self, id: int, title: str):
        self.id = id
        self.title = title