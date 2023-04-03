import Stack from "@mui/material/Stack";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import DatetimeComponent from "../../features/datetime-component";
import ClockInOutComponent from "../../features/clock-in-out";
import HolidaysComponent from "../../features/holidays-component";
import LeaveBalancesComponent from "../../features/leave-balances-component";
import NewPostComponent from "../../features/new-post-component";
import EventsComponent from "../../features/events-component";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../../utils/axios";
import store from "../../store/store";

export default function Dashboard() {
  const user = store.getState().auth.user;

  const [selectedView, setSelectedView] = useState();

  const [departmentsList, setDepartmentList] = useState([]);

  const { data: departments, isLoading } = useQuery("fetch-users", () => {
    return axiosInstance.get("api/Department/get-all").then((r) => r.data);
  });

  useEffect(() => {
    setDepartmentList(departments?.response);
  }, [departments?.response]);

  return (
    <>
      <Stack direction="row" spacing={1.5}>
        <Box flexGrow={0}>
          <Stack direction="column" spacing={1.5}>
            <DatetimeComponent />
            <ClockInOutComponent />
            <Stack direction="column" spacing={1.5}>
              <LeaveBalancesComponent />
              <HolidaysComponent />
            </Stack>
          </Stack>
        </Box>
        <Box flexGrow={1} style={{ maxWidth: "550px" }}>
          <Stack direction="column" spacing={1.5}>
            <ButtonGroup size="large" aria-label="large button group">
              {!isLoading &&
                departmentsList?.map((d) => (
                  <Button
                    variant={
                      selectedView?.id == d.id ? "contained" : "outlined"
                    }
                    onClick={() =>
                      setSelectedView(() => {
                        return {
                          id: d.id,
                          selected: true,
                          name: d.name,
                        };
                      })
                    }
                    key={"department-id" + d.id}
                  >
                    {d.name}
                  </Button>
                ))}
            </ButtonGroup>
            <NewPostComponent currentView={selectedView} />
            <EventsComponent />
          </Stack>
        </Box>
        <Box flexGrow={0}></Box>
      </Stack>
    </>
  );
}
