import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import Link from "@mui/material/Link";
import { Outlet } from "react-router-dom";

const PublicAppBar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              FALCON ONE
              <RocketLaunchOutlinedIcon inheritViewBox />
            </Typography>
            <Link href="request-information" color="inherit">
              Login
            </Link>{" "}
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "5.5rem" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default PublicAppBar;
