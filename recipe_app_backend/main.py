from fastapi import FastAPI
from routers.recipe_router import router as recipe_router

app = FastAPI()

app.include_router(recipe_router, prefix="/recipes")

@app.get("/")
def read_root():
    return {"Message": "Server works!"}


    