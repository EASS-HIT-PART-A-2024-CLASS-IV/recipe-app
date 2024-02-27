from fastapi.testclient import TestClient
from main import app
import pytest
import os

client = TestClient(app)

@pytest.fixture(scope="module", autouse=True)
def cleanup_database():
    yield


    try:
        os.remove("./test.db")
    except FileNotFoundError:
        pass 

client = TestClient(app)

# Should register user
def test_user_registration_success():
    response = client.post("/users/register", json={"email": "user@example.com", "password": "password123"})
    assert response.status_code == 200
    assert "access_token" in response.json()

# Should throw error detailing email already exists
def test_user_registration_duplicate_email():
    response = client.post("/users/register", json={"email": "user@example.com", "password": "password123"})
    assert response.status_code == 400
    assert response.json().get("detail") == "Email already registered"
  
# Should login user
def test_user_login_success():    
    login_response = client.post("/users/login", json={"email": "user@example.com", "password": "password123"})
    assert login_response.status_code == 200
    assert "access_token" in login_response.json()

# Should throw error detailing wrong credentials
def test_user_login_invalid_credentials():
    login_response = client.post("/users/login", json={"email": "user@example.com", "password": "wrongpassword"})
    assert login_response.status_code == 401
    assert login_response.json().get("detail") == "Invalid email or password"
    
# Should succesfully add 2 recipes to user favorite list
def test_add_favorite_recipes():
    user_id = 1
    recipe_id = 123
    title = "First Test Recipe"
    response_first = client.post("favorite_recipes/add", json={"user_id": user_id, "recipe_id": recipe_id, "title": title})
    assert response_first.status_code == 200
    assert response_first.json() == {"message": "Recipe added to favorites successfully"}

    second_user_id = 1
    second_recipe_id = 456
    second_title = "Second Test Recipe"
    response_second = client.post("favorite_recipes/add", json={"user_id": second_user_id, "recipe_id": second_recipe_id, "title": second_title})
    assert response_second.status_code == 200
    assert response_second.json() == {"message": "Recipe added to favorites successfully"}

# Should fail to add duplicate recipe
def test_add_duplicate_favorite_recipes():
    user_id = 1
    recipe_id = 123
    title = "First Test Recipe"
    response_first = client.post("favorite_recipes/add", json={"user_id": user_id, "recipe_id": recipe_id, "title": title})
    assert response_first.status_code == 400
    assert response_first.json().get("detail") == "Recipe already in favorites"
    
# Should get right amount of recipes(2)
def test_get_favorite_recipes_before_remove():
    user_id = 1

    response = client.get(f"favorite_recipes/{user_id}/list")
    assert response.status_code == 200
    recipes = response.json()
    assert isinstance(recipes, list)
    assert len(recipes) == 2, "The number of favorite recipes should be 2"

# Should remove one recipe for the user
def test_remove_favorite_recipe():
    user_id = 1
    recipe_id = 123

    response = client.delete(f"favorite_recipes/{user_id}/remove/{recipe_id}")
    assert response.status_code == 200
    assert response.json() == {"message": "Recipe removed from favorites successfully"}
    
# Should get right amount of recipes(1)
def test_get_favorite_recipes_after_remove():
    user_id = 1

    response = client.get(f"favorite_recipes/{user_id}/list")
    assert response.status_code == 200
    recipes = response.json()
    assert isinstance(recipes, list)
    assert len(recipes) == 1, "The number of favorite recipes should be 1"