from pydantic import BaseModel
from services.spoonacular_service.models.spoonacular_ingredient_model import IngredientModel

class RecipeModel(BaseModel):
    id: int
    title: str
    imageType: str
    imageType: str
    likes: int
    missedIngredientCount: int
    missedIngredients: list[IngredientModel]
    unusedIngredients: list[IngredientModel]
    usedIngredientCount: int
    usedIngredients: list[IngredientModel]
