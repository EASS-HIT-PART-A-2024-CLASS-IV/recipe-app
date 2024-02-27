from fastapi import APIRouter, Depends, HTTPException, Query
import os

import httpx
from clients.spoonacular_client import SpoonacularClient

router = APIRouter()

spoonacular_client = SpoonacularClient(f'{os.getenv("SPOONACULAR_MICROSERVICE_URL")}/recipes')

@router.get("/findByIngredients")
async def get_recipes_by_ingredients(ingredients: list[str] = Query(...), max_results: int = 10):
    try:
        return await spoonacular_client.get_recipes_by_ingredients(ingredients, max_results)
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)
    
@router.get("/{id}/analyzedInstructions")
async def get_analyzed_instructions(id: int):
    try:
        return await spoonacular_client.get_analyzed_instructions(id)
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)