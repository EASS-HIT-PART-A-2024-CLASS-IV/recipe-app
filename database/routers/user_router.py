from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.db_schemas import User
from utils import hash_password, verify_password
from services.auth_service import AuthService
from pydantic import BaseModel
from services.db_service import DatabaseService

router = APIRouter()
database_service = DatabaseService();
authService = AuthService();

class UserCredentials(BaseModel):
    email: str
    password: str
    
@router.post("/register")
def register_user(user: UserCredentials, db: Session = Depends(database_service.get_db)):
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_password = hash_password(user.password)
    db_user = User(email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    access_token = authService.create_access_token(data={"sub": db_user.email})
    return {
        "email": db_user.email,
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id
    }

@router.post("/login")
def login_user(credentials: UserCredentials, db: Session = Depends(database_service.get_db)):
    db_user = db.query(User).filter(User.email == credentials.email).first()
    if db_user is None or not verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    access_token = authService.create_access_token(data={"sub": db_user.email})
    return {
        "email": db_user.email, 
        "access_token": access_token, 
        "token_type": "bearer", 
        "user_id": db_user.id
    }