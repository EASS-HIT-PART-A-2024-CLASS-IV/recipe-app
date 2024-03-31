import { useEffect } from "react";
import { useUser } from "./UserContext";

export default function useLogSessionUser() {
  const { setUser } = useUser();
  useEffect(() => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      console.log(user);
      setUser(user);
    }
  }, []);
}
