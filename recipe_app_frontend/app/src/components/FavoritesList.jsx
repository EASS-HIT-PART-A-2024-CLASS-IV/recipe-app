import React from "react";
import { useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useFavorites } from "../context/FavoritesContext";

export default function FavoritesList({ recipes }) {
  const { removeFavorite } = useFavorites();
  const navigate = useNavigate();

  const handleViewMore = (recipeId, title) => {
    navigate(`/recipes/${recipeId}`, { state: { title, recipeId } });
  };
  return recipes.length ? (
    <>
      <Typography variant="h5" style={styles.header}>
        Favorites Recipes
      </Typography>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {recipes.map((recipe) => (
          <>
            <ListItem key={recipe.id}>
              <ListItemText primary={recipe.title} />
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleViewMore(recipe.id, recipe.title)}
                >
                  View
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeFavorite(recipe.id)}
                >
                  Remove
                </Button>
              </Box>
            </ListItem>
            <Divider></Divider>
          </>
        ))}
      </List>
    </>
  ) : (
    <Typography>No favorite recipes found ...</Typography>
  );
}

const styles = {
  header: { fontWeight: "600", color: "#4f4f4f" },
};
