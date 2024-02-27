from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

class DatabaseService:
    SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
    Base = declarative_base()
    _instance = None

    # ensure service is singleton
    def __new__(cls):
        if not cls._instance:
            cls._instance = super(DatabaseService, cls).__new__(cls)
            cls._instance.engine = create_engine(cls.SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
            cls._instance.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=cls._instance.engine)
        return cls._instance

    def get_db(self):
        db = self.SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def init_db(self):
        # Local import to avoid circular dependency issues
        from models.db_schemas import User, Recipe
        self.Base.metadata.create_all(bind=self.engine)