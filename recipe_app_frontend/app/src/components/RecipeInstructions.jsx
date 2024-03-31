import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeInstructions({ recipeData, title, recipeId }) {
  const [ingredientNames, setIngredientNames] = useState([]);
  const { addFavorite } = useFavorites();
  const recipe = recipeData[0];

  const getAllIngredientNames = () => {
    const ingredientsSet = new Set();

    recipeData.forEach((instructions) =>
      instructions.steps.forEach((step) => {
        step.ingredients.forEach((ingredient) =>
          ingredientsSet.add(ingredient.name)
        );
      })
    );

    return Array.from(ingredientsSet);
  };

  useEffect(() => {
    if (!recipeData) return;
    const ingredientNames = getAllIngredientNames();
    setIngredientNames(ingredientNames);
  }, [recipeData]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" style={styles.header} gutterBottom>
          {title}
        </Typography>
        <Button
          variant="outlined"
          color="success"
          onClick={() => addFavorite(recipeId, title)}
        >
          Save to Favorites
        </Button>
      </Box>

      <Typography variant="h5" style={styles.header} gutterBottom>
        Ingredients
      </Typography>
      <List>
        {ingredientNames.map((ingredient, i) => (
          <ListItem key={i} dense={true}>
            <ListItemText
              primary={
                <Box style={{ display: "flex" }}>
                  <Typography sx={{ mr: 1 }}>{i + 1}.</Typography>
                  <Typography>{ingredient}</Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
      <Typography variant="h5" style={styles.header} gutterBottom>
        Method
      </Typography>
      <List>
        {recipeData[0]?.steps.map((step, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar style={{ color: "#4f4f4f" }}>{step.number}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {step.step}
                    </Typography>
                    {step.ingredients.length > 0 && (
                      <Typography
                        variant="subtitle2"
                        sx={{ display: "block", mb: 1 }}
                      >
                        Ingredients:{" "}
                        {step.ingredients.map((ing) => ing.name).join(", ")}
                      </Typography>
                    )}
                    {step.equipment.length > 0 && (
                      <Typography variant="subtitle2" sx={{ display: "block" }}>
                        Equipment:{" "}
                        {step.equipment.map((equip) => equip.name).join(", ")}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
            {index < recipe.steps.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
}

const styles = {
  header: { fontWeight: "600", color: "#4f4f4f" },
};
