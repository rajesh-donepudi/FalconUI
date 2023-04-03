import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import clockin from "../assets/clock-in-card.jpg";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import AppModal from "../components/modal";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import React from "react";
import Clock from "react-live-clock";
import AppCard from "../components/card";
import BingMapsReact from "bingmaps-react";

const ClockInOutComponent = () => {
  const [state, setState] = useState(false);
  const [center, setCenter] = useState([0, 0]);

  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log("sss", position.coords.latitude);
    //     setPosition(position.coords);
    //   },
    //   () => {}
    // );
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  const mapReady = (props) => {
    console.log("map", props);
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Paper elevation={0}>
          <Card elevation={0} sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="240"
              style={{ objectFit: "contain" }}
              image={clockin}
            />
            <CardActions>
              <Button variant="contained" onClick={() => setState(true)}>
                Clock-In
              </Button>
              <Button variant="contained">Clock-Out</Button>
            </CardActions>
          </Card>
        </Paper>
      </Stack>
      <AppModal open={state} onClose={() => setState(false)}>
        <AppCard minWidth="500px" minHeight="420px">
          <Typography sx={{ fontSize: 10 }} color="text.secondary">
            CURRENT TIME
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
            <Clock
              format={"LTS"}
              ticking={true}
              timezone={Intl.DateTimeFormat().resolvedOptions().timeZone}
            />
          </Typography>
          <Stack sx={{ minHeight: "300px" }}>
            <Paper elevation={1} sx={{ padding: "0.6rem" }}>
              <BingMapsReact
                bingMapsKey=""
                height="300px"
                onMapReady={(props) => {
                  console.log(props);
                  // props.current?._options?.center.latitude = center[0];
                  // props.current?._options?.center.longitude = center[1];
                }}
                pushPins={[
                  {
                    center: {
                      latitude: center[0],
                      longitude: center[1],
                    },
                  },
                ]}
                mapOptions={{
                  navigationBarMode: "square",
                  disableZooming: true,
                  disableZooming: false,
                  disablePanning: true,
                  disableScrollWheelZoom: true,
                  showDashboard: false,
                  showZoomButtons: false,
                }}
                viewOptions={{
                  center: {
                    latitude: center[0],
                    longitude: center[1],
                  },
                  zoom: 18,
                  mapTypeId: "aerial",
                }}
              />
            </Paper>
            <Button variant="contained">Confirm Clock-In</Button>
          </Stack>
        </AppCard>
      </AppModal>
    </>
  );
};
export default ClockInOutComponent;
