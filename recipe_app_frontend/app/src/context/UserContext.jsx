import { createContext, useContext, useState } from "react";
import { useAlert } from "./AlertContext";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function UserProvider({ children }) {
  const apiUrl = `${import.meta.env.VITE_BASE_API_URL}/users`;

  const { setNewAlert } = useAlert();
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const login = async (userCredentials) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setNewAlert("error", data.detail);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (userCredentials) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setNewAlert("error", data.detail);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
