import os
from fastapi import HTTPException
import httpx
from services.spoonacular_service.interfaces.spoonacular_service_interface import SpoonacularServiceInterface

class SpoonacularService(SpoonacularServiceInterface):
    def __init__(self):
        self.url = "https://api.spoonacular.com";
    
    async def get_recipe_by_ingredients(self, ingredients: list[str], max_results: int):
        api_key = os.getenv("API_KEY")
        url = f"{self.url}/recipes/findByIngredients"

        params = {
            "apiKey": api_key,
            "ingredients": ingredients,
            "number": max_results
        }
        
        try:
            async with httpx.AsyncClient() as client: 
                res = await client.get(url, params=params)
                res.raise_for_status()
                return res.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail="Error fetching from spoonacular") from e