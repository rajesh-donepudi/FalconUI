import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

const getShort = (val) => {
  if (val !== "" || val !== null || val !== undefined) {
    return val.substring(0, 10).concat("...");
  }
};

const LogListItem = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow sx={{ borderBottom: "unset" }}>
        <TableCell
          component="th"
          scope="row"
          sx={{ padding: 0, lineHeight: 0 }}
        >
          {props.data.protocol}
        </TableCell>
        <TableCell title={props.data.ip}>{getShort(props.data.ip)}</TableCell>
        <TableCell title={props.data.scheme}>
          {getShort(props.data.scheme)}
        </TableCell>
        <TableCell title={props.data.host}>
          {getShort(props.data.host)}
        </TableCell>
        <TableCell title={props.data.method}>
          {getShort(props.data.method)}
        </TableCell>
        <TableCell title={props.data.path}>
          {getShort(props.data.path)}
        </TableCell>
        <TableCell title={props.data.traceIdentifier}>
          {getShort(props.data.traceIdentifier)}
        </TableCell>
        <TableCell title={props.data.resourceCode}>
          {getShort(props.data.resourceCode)}
        </TableCell>
        <TableCell title={props.data.userAgent}>
          {getShort(props.data.userAgent)}
        </TableCell>
        <TableCell title={props.data.controller}>
          {getShort(props.data.controller)}
        </TableCell>
        <TableCell title={props.data.action}>
          {getShort(props.data.action)}
        </TableCell>
        <TableCell title={props.data?.port}>
          {getShort(props.data?.port.toString())}
        </TableCell>
        <TableCell title={props.data?.recordedOn}>
          {getShort(props.data?.recordedOn.toString())}
        </TableCell>
      </TableRow>
    </>
  );
};

export default LogListItem;
