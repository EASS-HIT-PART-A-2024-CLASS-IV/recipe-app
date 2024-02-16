from fastapi import FastAPI
from api.api_v1.routers.recipe_router import router as recipe_router
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.include_router(recipe_router, prefix="/recipes")

@app.get("/test")
def read_root():
    return {"Message": "Server works!"}


    