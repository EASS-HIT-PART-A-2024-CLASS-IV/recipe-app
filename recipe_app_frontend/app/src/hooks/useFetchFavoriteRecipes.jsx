import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useAlert } from "../context/AlertContext";

export default function useFetchFavoriteRecipes() {
  const [recipes, setRecipes] = useState();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const { setNewAlert } = useAlert();

  const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/favorite_recipes`;

  useEffect(() => {
    console.log(user);
    const fetchFavorites = async (userId) => {
      const response = await fetch(`${apiUrl}/${userId}/list`);
      const data = await response.json();
      console.log(response);
      if (!response.ok) {
        setNewAlert("error", data.detail);
        console.error(error);
      } else {
        setRecipes(data);
      }
    };

    if (user.user_id) {
      console.log(user.user_id);
      fetchFavorites(user.user_id);
    }
  }, [user]);

  return { recipes, isLoading };
}
