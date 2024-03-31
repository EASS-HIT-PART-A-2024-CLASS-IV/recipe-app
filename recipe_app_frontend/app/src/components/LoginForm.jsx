import { useState } from "react";
import { useUser } from "../context/UserContext";
import { Box, Typography, TextField, Button } from "@mui/material";
import AlertDisplay from "../components/AlertDisplay";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);
  const navigation = useNavigate();

  const { login } = useUser();

  const handleSubmit = async () => {
    const isValid = validateInputs();

    if (isValid) {
      setDisableSubmit(true);
      const credentials = { email, password };

      await login(credentials);

      setDisableSubmit(false);
    }
  };

  const goToRegister = () => {
    navigation("/register");
  };

  const validateInputs = () => {
    let messages = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      messages.email = "Please enter a valid email address.";
    }
    if (password.length < 6) {
      messages.password = "Password must be at least 6 characters long.";
    }

    setValidationMessages(messages);

    return Object.keys(messages).length === 0;
  };
  return (
    <>
      <Typography variant="h5" style={styles.header}>
        Login
      </Typography>
      <TextField
        id="email-input"
        label="Email"
        variant="standard"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!validationMessages.email || false}
        helperText={validationMessages.email ? validationMessages.email : ""}
      />
      <TextField
        type="password"
        id="password-input"
        label="Password"
        variant="standard"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!validationMessages.password || false}
        helperText={
          validationMessages.password ? validationMessages.password : ""
        }
      />
      <Box style={styles.spacer}></Box>
      <Button
        variant="contained"
        disabled={disableSubmit}
        onClick={handleSubmit}
      >
        Login
      </Button>
      <Button variant="text" onClick={goToRegister}>
        Create an account
      </Button>
      <AlertDisplay />
    </>
  );
}

const styles = {
  spacer: { height: "1em" },
  header: { fontWeight: "600", color: "#4f4f4f" },
};
