 # Endpoints for fetching recipes (by ingredients, nutrients)
from fastapi import APIRouter, HTTPException, Query, Depends
from services.spoonacular_service.spoonacular_service import SpoonacularService
from services.spoonacular_service.interfaces.spoonacular_service_interface import SpoonacularServiceInterface

router = APIRouter();

def get_spoonacular_service() -> SpoonacularServiceInterface:
    return SpoonacularService()

@router.get("/findByIngredients")
async def get_recipes_by_ingredients(ingredients: list[str] = Query(...), max_results: int = 10, service: SpoonacularServiceInterface = Depends(get_spoonacular_service)):
    try:
        return await service.get_recipe_by_ingredients(ingredients, max_results)
    except HTTPException as e:
        # Log for develepment
        print(f"Error fetching from api")
        print(f"Status: {e.status_code}")
        print(f"Details: {e.detail}")
        # Propagate to client
        raise e