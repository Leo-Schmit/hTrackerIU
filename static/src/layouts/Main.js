import { Box } from "@mui/material";

function Main({ children }) {
  return (
    <Box sx={{ backgroundColor: "#f4f4f8", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: "800px", margin: "auto", pt: 0, px: 3 }}>{children}</Box>
    </Box>
  );
}

export default Main;
