from pydantic import BaseModel

class UserCredentials(BaseModel):
    email: str
    password: str
    
class AddFavoriteRequest(BaseModel):
    user_id: int
    recipe_id: int
    title: str

class RecipeData(BaseModel):
    id: int
    title: str