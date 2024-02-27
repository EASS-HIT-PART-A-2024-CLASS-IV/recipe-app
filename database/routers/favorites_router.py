from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from models.db_schemas import Recipe, User
from models.models import AddFavoriteRequest, RecipeData
from pydantic import BaseModel
from services.db_service import DatabaseService

router = APIRouter()

database_service = DatabaseService();

@router.post("/add")
def add_favorite_recipe(
    request: AddFavoriteRequest,
    db: Session = Depends(database_service.get_db),
):
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    recipe = db.query(Recipe).filter(Recipe.id == request.recipe_id).first()
    if not recipe:
        recipe = Recipe(id=request.recipe_id, title=request.title)
        db.add(recipe)
        db.commit()
        db.refresh(recipe)

    if recipe in user.favorite_recipes:
        raise HTTPException(status_code=400, detail="Recipe already in favorites")

    user.favorite_recipes.append(recipe)
    db.commit()

    return {"message": "Recipe added to favorites successfully"}

@router.delete("/{user_id}/remove/{recipe_id}")
def remove_favorite_recipe(
    user_id: int, 
    recipe_id: int, 
    db: Session = Depends(database_service.get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")

    if recipe not in user.favorite_recipes:
        raise HTTPException(status_code=400, detail="Recipe not in favorites")

    user.favorite_recipes.remove(recipe)
    db.commit()

    return {"message": "Recipe removed from favorites successfully"}

@router.get("/{user_id}/list", response_model=list[RecipeData])
def get_favorite_recipes(
    user_id: int,
    db: Session = Depends(database_service.get_db),
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    favorite_recipes = user.favorite_recipes
    return [RecipeData(id=recipe.id, title=recipe.title) for recipe in favorite_recipes]
