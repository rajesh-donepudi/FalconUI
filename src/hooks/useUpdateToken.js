import { useDispatch } from "react-redux";
import {
  updateAccessToken,
  updateRefreshToken,
} from "../features/authentication/authSlice";
export default function useUpdateToken(type, token) {
  const dispatch = useDispatch();
  switch (type) {
    case "access-token":
      dispatch(updateAccessToken(token));
    case "refresh-token":
      dispatch(updateRefreshToken(token));
    default:
  }
}
