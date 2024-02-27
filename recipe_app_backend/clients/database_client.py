import json
import httpx
from models.models import AddFavoriteRequest
    
class DatabaseClient:
    def __init__(self, base_url: str):
        self.base_url = base_url
        
    async def register_user(self, email: str, password: str):
        url = f"{self.base_url}/users/register"
        data = {"email": email, "password": password}
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data)
            response.raise_for_status()
            return response.json()

    async def login_user(self, email: str, password: str):
        url = f"{self.base_url}/users/login"
        data = {"email": email, "password": password}
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data)
            response.raise_for_status()
            return response.json()

    async def add_favorite_recipe(self, requestBody: AddFavoriteRequest):
        url = f"{self.base_url}/favorite_recipes/add"
        data = requestBody.model_dump()
        
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=data)
            response.raise_for_status()
            return response.json()
    
    async def remove_favorite_recipe(self, user_id: int, recipe_id: int):
        url = f"{self.base_url}/favorite_recipes/{user_id}/remove/{recipe_id}"
        
        async with httpx.AsyncClient() as client:
            response = await client.delete(url)
            response.raise_for_status()
            return response.json()

    async def get_favorite_recipes(self, user_id: int):
        url = f"{self.base_url}/favorite_recipes/{user_id}/list"
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()