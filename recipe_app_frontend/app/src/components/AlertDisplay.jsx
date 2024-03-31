import React from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import { useAlert } from "../context/AlertContext";

export default function AlertDisplay() {
  const { alert, isOpen, setIsOpen } = useAlert();

  return (
    <Collapse in={isOpen}>
      <Alert severity={alert.severity} onClose={() => setIsOpen(false)}>
        {alert.message}
      </Alert>
    </Collapse>
  );
}
