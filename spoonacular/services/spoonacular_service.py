import os
import httpx
from interfaces.spoonacular_service_interface import SpoonacularServiceInterface
from dotenv import load_dotenv


class SpoonacularService(SpoonacularServiceInterface):
    def __init__(self):
        load_dotenv()
        self.url = "https://api.spoonacular.com"
        self.apiKey = os.getenv("API_KEY")
    
    async def get_recipe_by_ingredients(self, ingredients: list[str], max_results: int):
        url = f"{self.url}/recipes/findByIngredients"
        params = {
            "apiKey": self.apiKey,
            "ingredients": ingredients,
            "number": max_results
        }
        
        try:
            async with httpx.AsyncClient() as client: 
                res = await client.get(url, params=params)
                res.raise_for_status()
                return res.json()
        except httpx.HTTPStatusError as e:
            raise e