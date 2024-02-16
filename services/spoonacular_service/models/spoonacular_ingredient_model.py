from pydantic import BaseModel

class IngredientModel(BaseModel):
    id: int
    aisle: str
    amount: float
    image: str
    meta: list[str]
    name: str
    original: str
    originalName: str
    unit: str
    unitLong: str
    unitShort: str
    