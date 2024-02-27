from pydantic import BaseModel

class AddFavoriteRequest(BaseModel):
    user_id: int
    recipe_id: int
    title: str

class RecipeData(BaseModel):
    id: int
    title: str