from abc import abstractmethod
from models.spoonacular_recipe_model import RecipeModel

class SpoonacularServiceInterface:
    @abstractmethod
    async def get_recipe_by_ingredients(ingredients: list[str], max_results: int) -> list[RecipeModel]:
        pass