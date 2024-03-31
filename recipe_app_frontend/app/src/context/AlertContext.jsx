import { useContext, createContext, useState, useEffect } from "react";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({ severity: "", message: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [alertStack, setAlertStack] = useState([]);

  const setNewAlert = (severity, message) => {
    const newAlert = { severity, message };
    setAlert(newAlert);
    setAlertStack((prevStack) => [...prevStack, newAlert]);
  };

  useEffect(() => {
    if (alertStack.length > 0) {
      setIsOpen(true);

      const timer = setTimeout(() => {
        setAlertStack((prevStack) => prevStack.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [alertStack]);

  return (
    <AlertContext.Provider value={{ setNewAlert, alert, isOpen, setIsOpen }}>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
