import { Paper } from "@mui/material";
import React from "react";

const AppPaper = (props) => {
  return (
    <Paper
      sx={{
        width: "100%",
        mb: 2,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05) !important",
      }}
    >
      {props.children}
    </Paper>
  );
};

export default AppPaper;
