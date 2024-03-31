import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CircularProgress, Box, Typography } from "@mui/material";
import BasicWrapper from "../components/BasicWrapper";
import AlertDisplay from "../components/AlertDisplay";
import RecipeInstructions from "../components/RecipeInstructions";
import { useAlert } from "../context/AlertContext"; // Adjust import paths as necessary

export default function RecipePage() {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setNewAlert } = useAlert();

  const location = useLocation();
  const { title } = location.state;

  const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/recipes`;

  useEffect(() => {
    const fetchRecipeData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/${recipeId}/analyzedInstructions`
        );
        const data = await response.json();
        if (!response.ok) {
          console.error(response);
          setNewAlert("error", data.detail || "An error occurred");
        } else {
          setRecipeData(data);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setNewAlert("error", error.toString());
      } finally {
        setIsLoading(false);
      }
    };

    if (recipeId) {
      fetchRecipeData();
    }
  }, [recipeId]);

  return (
    <BasicWrapper width="100%">
      <AlertDisplay />
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <CircularProgress />
        </Box>
      ) : recipeData ? (
        <RecipeInstructions
          recipeData={recipeData}
          title={title}
          recipeId={recipeId}
        />
      ) : (
        <Typography>No recipe data found.</Typography>
      )}
    </BasicWrapper>
  );
}
