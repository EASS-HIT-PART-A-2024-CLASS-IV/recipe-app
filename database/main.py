from fastapi import FastAPI
from routers.user_router import router as user_router
from routers.favorites_router import router as favorite_recipes_router
from dotenv import load_dotenv
from services.db_service import DatabaseService

app = FastAPI()
database_service = DatabaseService()

database_service.init_db()

load_dotenv()

app.include_router(user_router, prefix="/users")
app.include_router(favorite_recipes_router, prefix="/favorite_recipes")

@app.get("/")
async def root():
    return {"message": "Hello World From Database"}