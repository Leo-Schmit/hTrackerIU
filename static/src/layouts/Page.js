import { Box } from "@mui/material";

function Page({ children }) {
  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        pt: 5,
      }}
    >
      {children}
    </Box>
  );
}

export default Page;
