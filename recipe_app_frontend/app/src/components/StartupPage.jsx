import { useUser } from "../context/UserContext";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import RecipePage from "../pages/RecipePage";
import FavoritesPage from "../pages/FavoritesPage";
import useLogSessionUser from "../context/useLogSessionUser";
import { FavoritesProvider } from "../context/FavoritesContext";

export default function StartupPage() {
  const { user } = useUser();
  useLogSessionUser();

  return user ? (
    <Box>
      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recipes/:recipeId" element={<RecipePage />} />
        </Routes>
      </FavoritesProvider>
    </Box>
  ) : (
    <Box>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Box>
  );
}
