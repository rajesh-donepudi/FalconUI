import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import Clock from "react-live-clock";
import moment from "moment";
import AppCard from "../components/card";

const DateTimeComponent = () => {
  return (
    <>
      <Stack direction="row" spacing={2}>
        <AppCard>
          <Typography sx={{ fontSize: 10 }} color="text.secondary">
            TIME
          </Typography>
          <Typography variant="h6">
            <Clock
              format={"LTS"}
              ticking={true}
              timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            />
          </Typography>
        </AppCard>
        <AppCard sx={{ minWidth: "auto" }}>
          <Typography sx={{ fontSize: 10 }} color="text.secondary">
            TODAY
          </Typography>
          <Typography variant="h6">{moment().format("ll")}</Typography>
        </AppCard>
      </Stack>
    </>
  );
};

export default DateTimeComponent;
