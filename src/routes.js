import { Route, Routes } from "react-router-dom";
import Login from "./pages/public-pages/login";
import Dashboard from "./pages/dashboard/dashboard";
import Test from "./pages/test";
import ResetPassword from "./pages/public-pages/reset-password";
import RequiredAuth from "./features/authentication/required-auth";
import PublicAppBar from "./public-appbar";
import { AuthCheck } from "./features/authentication/AuthCheck";
import AccessManagement from "./pages/security";
import ManageUser from "./pages/user-management/manage-user";
import Profile from "./pages/account/profile";
import Signup from "./pages/public-pages/signup";
import ForgotPassword from "./pages/public-pages/forgot-password";
import Layout from "./layout";
import RequestInformation from "./pages/request-information";
import Users from "./pages/user-management/users";
import Notfound from "./components/not-found";
import ThemeConfig from "./pages/settings/ThemeConfig";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<AuthCheck />}>
          <Route element={<PublicAppBar />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/t" element={<Test />}></Route>
          </Route>
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/" element={<Layout />}>
            <Route index path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/request-information"
              element={<RequestInformation />}
            />
            <Route path="/users" element={<Users />}></Route>
            <Route path="/users/:id" element={<ManageUser />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/security" element={<AccessManagement />} />
            <Route path="/theme-config" element={<ThemeConfig />} />
          </Route>
        </Route>
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </>
  );
}
