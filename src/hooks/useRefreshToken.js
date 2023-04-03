import { useSelector } from "react-redux";
import { selectCurrentRefreshToken } from "../features/authentication/authSlice";

export default function useRefreshToken() {
  return useSelector(selectCurrentRefreshToken);
}
