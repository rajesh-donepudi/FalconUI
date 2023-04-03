import env from "react-dotenv";
import {
  updateCredentials,
  logOut,
} from "../features/authentication/authSlice";
import useAccessToken from "../hooks/useAccessToken";
import useRefreshToken from "../hooks/useRefreshToken";
import axiosInstance from "../utils/axios";

const useAxiosPrivate = (store) => {
  const accessToken = useAccessToken();
  const refreshToken = useRefreshToken();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] =
          "Bearer " + localStorage.getItem("accessToken");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err?.config;

      // if (err.response.status === 400) {
      //   console.log(err);
      //   store.dispatch(logOut());
      // }

      if (originalConfig?.url !== env.SIGN_IN_URL && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const response = await axiosInstance.post(env.REFRESH_TOKEN, {
              refreshToken: localStorage.getItem("refreshToken"),
            });

            console.log("Axios res", response?.data?.response);
            store.dispatch(updateCredentials(response?.data?.response));

            localStorage.setItem(
              "accessToken",
              response?.data?.response?.jwtToken
            );
            localStorage.setItem(
              "refreshToken",
              response?.data?.response?.refreshToken
            );

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};
export default useAxiosPrivate;
