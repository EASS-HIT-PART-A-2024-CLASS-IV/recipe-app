from fastapi import APIRouter, HTTPException
from clients.database_client import DatabaseClient
import httpx
import os
from models.models import AddFavoriteRequest

router = APIRouter()
database_client = DatabaseClient(os.getenv("DATABASE_URL"))

@router.post("/add")
async def add_favorite_recipe(request: AddFavoriteRequest):
    try:
        response = await database_client.add_favorite_recipe(request)
        return response
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)
    
@router.delete("/{user_id}/remove/{recipe_id}")
async def remove_favorite_recipe(user_id: int, recipe_id: int):
    try:
        response = await database_client.remove_favorite_recipe(user_id=user_id, recipe_id=recipe_id)
        return response
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)

@router.get("/{user_id}/list")
async def get_favorite_recipes(user_id: int):
    try:
        response = await database_client.get_favorite_recipes(user_id=user_id)
        return response
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)