import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import AppCard from "../components/card";

const LeaveBalancesComponent = () => {
  return (
    <>
      <AppCard sx={{ minWidth: "auto" }}>
        <Typography sx={{ fontSize: 10 }} color="text.secondary">
          LEAVE BALANCES
        </Typography>
        <Stack pt={2} direction="row" justifyContent="space-around" spacing={2}>
          <Stack direction="column">
            <Typography sx={{ fontSize: 8 }} color="text.secondary">
              OPTIONAL
            </Typography>
            <Typography>9</Typography>
          </Stack>
          <Stack direction="column">
            <Typography sx={{ fontSize: 8 }} color="text.secondary">
              EARNED
            </Typography>
            <Typography>10</Typography>
          </Stack>
        </Stack>
      </AppCard>
    </>
  );
};

export default LeaveBalancesComponent;
