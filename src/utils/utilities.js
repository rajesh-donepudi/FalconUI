import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import CancelIcon from "@mui/icons-material/Cancel";
const Utilities = {
  formatBoolean: (val) => {
    return val ? (
      <div>
        <CheckCircleIcon sx={{ color: "green" }} /> Yes
      </div>
    ) : (
      <>
        <CancelIcon sx={{ color: "darkred" }} /> No
      </>
    );
  },
  formatBooleanWithoutIcon: (val) => {
    return val ? (
      <div>
        <CheckCircleIcon sx={{ color: "green" }} /> Yes
      </div>
    ) : (
      <>
        <CancelIcon sx={{ color: "darkred" }} /> No
      </>
    );
  },
  formatPhone: (phone) => formatPhoneNumberIntl(phone),
};

export default Utilities;
