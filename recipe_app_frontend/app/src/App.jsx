import "./App.css";
import Navbar from "./components/Navbar";
import { Box } from "@mui/material";
import { UserProvider } from "./context/UserContext";
import { AlertProvider } from "./context/AlertContext";
import StartupPage from "./components/StartupPage";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";

function App() {
  return (
    <Router>
      <AlertProvider>
        <UserProvider>
          <Navbar />
          <Box style={style.container}>
            <StartupPage />
          </Box>
        </UserProvider>
      </AlertProvider>
    </Router>
  );
}

const style = {
  container: {
    margin: "0 auto",
    width: "1200px",
  },
};

export default App;
