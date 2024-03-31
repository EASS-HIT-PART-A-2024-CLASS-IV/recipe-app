import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useAlert } from "./AlertContext";
import useFetchFavoriteRecipes from "../hooks/useFetchFavoriteRecipes";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/favorite_recipes`;
  const [favorites, setFavorites] = useState();
  const { setNewAlert } = useAlert();
  const { user } = useUser();

  useEffect(() => {
    const fetchFavorites = async (userId) => {
      const response = await fetch(`${apiUrl}/${userId}/list`);
      const data = await response.json();

      if (!response.ok) {
        setNewAlert("error", data.detail);
        console.error(error);
      } else {
        setFavorites(data);
      }
    };

    if (user.user_id) {
      fetchFavorites(user.user_id);
    }
  }, [user]);

  const addFavorite = async (recipeId, title) => {
    console.log(user);
    const payload = { recipe_id: recipeId, title, user_id: user.user_id };
    try {
      const response = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        setNewAlert("error", data.detail);
      } else {
        setNewAlert("success", data.message);
        favorites.push({ id: recipeId, title });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async (recipeId) => {
    try {
      const response = await fetch(
        `${apiUrl}/${user.user_id}/remove/${recipeId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      if (!response.ok) {
        setNewAlert("error", data.detail);
      } else {
        setFavorites(favorites.filter((recipe) => recipe.id !== recipeId));
        setNewAlert("success", data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
