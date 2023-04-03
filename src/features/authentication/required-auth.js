import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";

export default function RequiredAuth() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
