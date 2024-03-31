import { Box } from "@mui/material";

export default function BasicWrapper({ children, width = "30em" }) {
  return <Box style={{ ...styles.container, width }}>{children}</Box>;
}

const styles = {
  container: {
    margin: "0 auto",
    marginTop: "2em",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "1.5em",
    padding: "3em",
    backgroundColor: "white",
    borderRadius: "5px",
    boxShadow: "1px 1px 5px #7b7b7b",
  },
  //   spacer: { height: "1em" },
  //   header: { fontWeight: "600", color: "#4f4f4f" },
};
