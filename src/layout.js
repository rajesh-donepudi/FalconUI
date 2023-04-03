import AppNavBar from "./pages/app-bar";
import Box from "@mui/material/Box";

export default function Layout() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppNavBar />
      </Box>
    </>
  );
}
