import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

function RecipeList({ recipes }) {
  const navigation = useNavigate();
  const { addFavorite } = useFavorites();

  const handleViewMore = (recipeId, title, image = "") => {
    navigation(`/recipes/${recipeId}`, { state: { title, recipeId, image } });
  };

  return (
    <Box sx={{ width: "100%", overflow: "auto", mt: 3 }}>
      <Typography variant="subtitle2" style={{ color: "gray" }}>
        Results({recipes.length}):
      </Typography>
      <List sx={{ width: "100%" }}>
        {recipes.map((recipe) => (
          <ListItem
            key={recipe.id}
            alignItems="flex-start"
            sx={{ borderBottom: 1, borderColor: "divider", paddingBottom: 2 }}
          >
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                src={recipe.image}
                alt={recipe.title}
                sx={{ width: 140, height: 140, marginRight: 2 }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="h6" style={{ fontWeight: 600 }}>
                  {recipe.title}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                    sx={{ display: "block", mb: 1 }}
                  >
                    Likes: {recipe.likes}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    {recipe.usedIngredients.map((ingredient) => (
                      <Chip
                        key={ingredient.id}
                        label={ingredient.name}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    {recipe.missedIngredients.map((ingredient) => (
                      <Chip
                        key={ingredient.id}
                        label={ingredient.name}
                        color="secondary"
                        size="small"
                      />
                    ))}
                  </Stack>
                </>
              }
            />
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                sx={{ mr: 1 }}
                size="small"
                variant="outlined"
                color="success"
                onClick={() => addFavorite(recipe.id, recipe.title)}
              >
                Save to Favorites
              </Button>

              <Button
                variant="outlined"
                size="small"
                color="info"
                onClick={() =>
                  handleViewMore(recipe.id, recipe.title, recipe.image)
                }
              >
                View More
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default RecipeList;
