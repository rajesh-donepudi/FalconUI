import { Typography } from "@mui/material";
const TableTitle = (props) => {
  return (
    <Typography sx={{ fontWeight: 900, fontSize: "1.2rem", flex: "1 1 100%" }}>
      {props.title}
    </Typography>
  );
};

export default TableTitle;
