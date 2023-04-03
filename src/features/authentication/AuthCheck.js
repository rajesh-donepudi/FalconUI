import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { selectCurrentUser } from "./authSlice";

export function AuthCheck() {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  return user === null ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
}
