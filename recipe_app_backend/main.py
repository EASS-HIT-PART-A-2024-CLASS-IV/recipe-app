from fastapi import FastAPI
from routers.recipe_router import router as recipe_router
from routers.users_router import router as users_router
from routers.favorite_recipes_router import router as favorite_recipes_router

app = FastAPI()

app.include_router(recipe_router, prefix="/recipes")
app.include_router(users_router, prefix="/users")
app.include_router(favorite_recipes_router, prefix="/favorite_recipes")

@app.get("/")
def read_root():
    return {"Message": "Server works!"}


    