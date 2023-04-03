import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Utilities from "../utils/utilities";
import { useState } from "react";

export default function AppSwitch(props) {
  const [value, setValue] = useState(props.value);
  return (
    <FormGroup>
      {props.value ? (
        <FormControlLabel
          control={
            <Switch
              value={props.value}
              onChange={props.onValueChange}
              size="small"
              defaultChecked
            />
          }
          label={Utilities.formatBooleanWithoutIcon(props.value)}
        />
      ) : (
        <FormControlLabel
          control={
            <Switch
              onChange={props.onValueChange}
              value={props.value}
              size="small"
            />
          }
          label={Utilities.formatBooleanWithoutIcon(props.value)}
        />
      )}
    </FormGroup>
  );
}
