from models.models import UserCredentials
from fastapi import APIRouter, HTTPException
from clients.database_client import DatabaseClient
import httpx
import os

router = APIRouter()
database_client = DatabaseClient(os.getenv("DATABASE_URL"))

@router.post("/register")
async def register_user(user: UserCredentials):
    try:
        response = await database_client.register_user(email=user.email, password=user.password)
        return response
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)

@router.post("/login")
async def login_user(credentials: UserCredentials):
    try:
        response = await database_client.login_user(email=credentials.email, password=credentials.password)
        return response
    except httpx.HTTPStatusError as e:
        error_details = e.response.json().get('detail', str(e))
        raise HTTPException(status_code=e.response.status_code, detail=error_details)