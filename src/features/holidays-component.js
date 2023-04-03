import Typography from "@mui/material/Typography";
import AppCard from "../components/card";

const HolidaysComponent = () => {
  return (
    <>
      <AppCard hasFooter="true">
        <Typography sx={{ fontSize: 10 }} color="text.secondary">
          HOLIDAYS
        </Typography>
        <Typography variant="h6">Indian Independence Day</Typography>
      </AppCard>
    </>
  );
};

export default HolidaysComponent;
