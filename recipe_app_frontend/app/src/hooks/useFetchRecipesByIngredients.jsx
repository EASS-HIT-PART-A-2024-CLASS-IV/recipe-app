import { useState, useEffect } from "react";
import { useAlert } from "../context/AlertContext";

export default function useFetchRecipesByIngredients(ingredients) {
  const [recipes, setRecipes] = useState(() => {
    const savedRecipes = sessionStorage.getItem("recipesCache");
    return savedRecipes ? JSON.parse(savedRecipes) : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setNewAlert } = useAlert();

  const apiUrl = `${
    import.meta.env.VITE_BASE_API_URL
  }/recipes/findByIngredients`;

  useEffect(() => {
    if (!ingredients?.length) return;

    // DEV
    // const savedRecipes = sessionStorage.getItem("recipesCache");
    // if (savedRecipes) {
    //   return JSON.parse(savedRecipes);
    // }

    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        const ingredientsQueryParam = ingredients
          .map((ingredient) => `ingredients=${encodeURIComponent(ingredient)}`)
          .join("&");

        const response = await fetch(`${apiUrl}?${ingredientsQueryParam}`);
        const data = await response.json();

        if (!response.ok) {
          console.error(response);
          setNewAlert("error", data.detail);
        } else {
          setRecipes(data);
          sessionStorage.setItem("recipesCache", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      }
      setIsLoading(false);
    };

    if (ingredients.length) {
      fetchRecipes();
    }
  }, [ingredients]);

  return { recipes, isLoading };
}
