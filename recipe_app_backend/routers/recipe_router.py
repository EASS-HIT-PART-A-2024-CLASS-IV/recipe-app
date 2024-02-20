 # Endpoints for fetching recipes (by ingredients, nutrients)
from fastapi import APIRouter, HTTPException, Query
import os
from clients.spoonacular_client import SpoonacularClient

router = APIRouter()

spoonacular_client = SpoonacularClient(os.getenv("SPOONACULAR_MICROSERVICE_URL"))

@router.get("/findByIngredients")
async def get_recipes_by_ingredients(ingredients: list[str] = Query(...), max_results: int = 10):
    try:
        return await spoonacular_client.get_recipes_by_ingredients(ingredients, max_results)
    except HTTPException as e:
        # Log for develepment
        print(f"Error fetching from api")
        print(f"Status: {e.status_code}")
        print(f"Details: {e.detail}")
        # Propagate to client
        raise e