import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/");
  };

  const handleFavorites = () => {
    navigate("/favorites");
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ marginRight: 55 }}>
          Recipe App
        </Typography>

        <Button color="inherit" onClick={handleHome}>
          <Typography>Home</Typography>
        </Button>

        <Button
          color="inherit"
          onClick={handleFavorites}
          sx={{ marginRight: "auto" }}
        >
          <Typography>Favorites</Typography>
        </Button>

        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
