from fastapi import FastAPI, HTTPException, Query
from services.spoonacular_service import SpoonacularService

app = FastAPI()
spoonacular_service = SpoonacularService()

@app.get("/recipes/findByIngredients")
async def find_by_ingredients(ingredients: list[str] = Query(...), max_results: int = 10):
    try:
        return await spoonacular_service.get_recipe_by_ingredients(ingredients, max_results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))