import { TableCell } from "@mui/material";

export function FLOBoldTableCell(props) {
  const style = {
    fontWeight: props.fontWeight ?? 600,
    textTransform: "uppercase",
    color: props.color ?? "",
    fontSize: props.fontSize ?? "",
  };
  return <TableCell sx={style}>{props.content}</TableCell>;
}
