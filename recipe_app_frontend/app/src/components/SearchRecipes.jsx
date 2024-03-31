import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import RecipeList from "./RecipeList";
import AlertDisplay from "./AlertDisplay";
import useFetchRecipesByIngredients from "../hooks/useFetchRecipesByIngredients";

export default function SearchRecipes() {
  const [ingredientInput, setIngredientInput] = useState("");
  const [error, setError] = useState("");
  const [ingredients, setIngredients] = useState([]);

  const { recipes, isLoading } = useFetchRecipesByIngredients(ingredients);

  const handleInputChange = (event) => {
    setIngredientInput(event.target.value);
    setError("");
  };

  const validateAndSearch = () => {
    const ingredientsArray = ingredientInput
      .split(",")
      .map((ingredient) => ingredient.trim());

    if (
      !ingredientsArray.length ||
      ingredientsArray.some(
        (ing) => ing.length < 2 || !/^[A-Za-z\s]+$/.test(ing)
      )
    ) {
      setError(
        "Please enter valid ingredients (letters only, separated by commas)."
      );
      return;
    }

    setIngredients(ingredientsArray);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      validateAndSearch();
    }
  };

  return (
    <>
      <Typography variant="h4" style={styles.header}>
        Discover new recipes
      </Typography>
      <Box style={styles.boxColumn}>
        <Typography>Enter ingredients, separated by commas</Typography>
        <Box style={styles.boxRow}>
          <TextField
            fullWidth
            id="ingredient-input"
            label="Ingredients"
            variant="standard"
            value={ingredientInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            error={!!error}
            helperText={error || "Example: onions, garlic, chicken"}
            margin="normal"
          />

          <Button
            onClick={validateAndSearch}
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </Box>
        {isLoading && (
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <AlertDisplay />
      {!isLoading && recipes.length > 0 && <RecipeList recipes={recipes} />}
    </>
  );
}

const styles = {
  spacer: { height: "1em" },
  header: { fontWeight: "600", color: "#4f4f4f" },
  boxColumn: { display: "flex", flexDirection: "column" },
  boxRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "1em",
  },
};
