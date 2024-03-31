import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import AlertDisplay from "./AlertDisplay";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [validationMessages, setValidationMessages] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(false);

  const { register } = useUser();

  const handleSubmit = async () => {
    const isValid = validateInputs();

    if (isValid) {
      setDisableSubmit(true);
      const credentials = { email, password };
      try {
        await register(credentials);
      } catch (error) {
        console.error(error);
      } finally {
        setDisableSubmit(false);
      }
    }
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
    if (password !== repeatPassword) {
      messages.repeatPassword = "Passwords do not match.";
    }

    setValidationMessages(messages);

    return Object.keys(messages).length === 0;
  };

  return (
    <>
      <Typography variant="h5" style={styles.header}>
        REGISTER
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
      <TextField
        type="password"
        id="repeat-password-input"
        label="Repeat Password"
        variant="standard"
        value={repeatPassword}
        onChange={(e) => {
          setRepeatPassword(e.target.value);
        }}
        error={!!validationMessages.repeatPassword || false}
        helperText={
          validationMessages.repeatPassword
            ? validationMessages.repeatPassword
            : ""
        }
      />
      <Box style={styles.spacer}></Box>
      <Button
        variant="contained"
        disabled={disableSubmit}
        onClick={handleSubmit}
      >
        Register
      </Button>
      <AlertDisplay />
    </>
  );
}

const styles = {
  container: {
    margin: "0 auto",
    marginTop: "2em",
    display: "flex",
    width: "30em",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1.5em",
    padding: "3em",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "1px 1px 5px #7b7b7b",
  },
  spacer: { height: "1em" },
  header: { fontWeight: "600", color: "#4f4f4f" },
};
