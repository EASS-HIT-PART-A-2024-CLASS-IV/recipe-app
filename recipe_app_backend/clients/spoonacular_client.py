import httpx

class SpoonacularClient:
    def __init__(self, base_url: str):
            self.base_url = base_url
            
    async def get_recipes_by_ingredients(self, ingredients: list[str], max_results: int):
        
        url = f"{self.base_url}/recipes/findByIngredients"
        params = {
            "ingredients": ingredients,
            "max_results": max_results
        }
        async with httpx.AsyncClient() as client:
            response = await client.get(url, params=params)
            response.raise_for_status()
            return response.json()