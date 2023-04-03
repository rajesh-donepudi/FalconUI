import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Box } from "@mui/system";
import Tab from "@mui/material/Tab";
import AppCard from "../components/card";
import Tabs from "@mui/material/Tabs";
import CakeIcon from "@mui/icons-material/Cake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { Button } from "@mui/material";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";

const EventsComponent = () => {
  const [value, setValue] = useState(0);
  const buttons = [
    <Button key="one">Organization</Button>,
    <Button key="two">.NET</Button>,
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <AppCard>
        <Typography
          sx={{
            fontSize: 10,
            backgroundColor: "#FFFBEB",
            padding: "1rem",
          }}
          color="text.secondary"
        >
          TODAY
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                icon={<CakeOutlinedIcon />}
                iconPosition="start"
                label="Birthdays"
                {...a11yProps(0)}
              />
              <Tab
                icon={<CelebrationOutlinedIcon />}
                iconPosition="start"
                label="Work Anniversaries"
                {...a11yProps(1)}
              />
              <Tab
                icon={<PeopleOutlineOutlinedIcon />}
                iconPosition="start"
                label="New joinees"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            Organization
          </TabPanel>
          <TabPanel value={value} index={1}>
            Development
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </AppCard>
    </>
  );
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default EventsComponent;
