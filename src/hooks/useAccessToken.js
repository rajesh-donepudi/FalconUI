import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/authentication/authSlice";

export default function useAccessToken() {
  return useSelector(selectCurrentToken);
}
