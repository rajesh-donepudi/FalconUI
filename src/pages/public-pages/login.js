import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import { useEffect, useMemo, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import { LoginValidationScheme } from "../../validation-schemes/validation-schemes";
import { useMutation } from "react-query";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authentication/authSlice";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   intlTelInput(phoneRef.current, {
  //     initialCountry: "auto",
  //     geoIpLookup: function (success, failure) {
  //       fetch("https://ipinfo.io/106.195.72.51?token=a98b8b2eda19b4")
  //         .then((res) => res.json())
  //         .then((re) => success(re.country));
  //     },
  //   });
  // }, []);

  const [showPassword, setShowPassword] = useState({
    showPassword: false,
  });

  const login = useMutation(
    (payload) => {
      return axiosInstance.post("/api/Account/login", payload, {
        withCredentials: false,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        console.log("I'm first!");
        console.log(data);
        dispatch(setCredentials(data?.data?.response));
        localStorage.setItem("accessToken", data?.data?.response.jwtToken);
        localStorage.setItem("refreshToken", data?.data?.response.refreshToken);
        navigate("/dashboard");
      },
      onSettled: async () => {
        console.log("I'm second!");
      },
    }
  );

  const handleClickShowPassword = () => {
    setShowPassword({
      ...showPassword,
      showPassword: !showPassword.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "a@a.com",
      password: "@Raj@123",
    },
    validationSchema: LoginValidationScheme,
    onSubmit: (payload) => {
      login.mutate(payload);
    },
  });

  const intlTelOpts = {
    preferredCountries: ["cn"],
    geoIpLookup: (success, fail) => {
      const res = axiosInstance.get(
        "ipinfo.io/106.195.72.51?token=a98b8b2eda19b4",
        {
          withCredentials: false,
        }
      );
      const { country } = res.data;
      success(country);
    },
  };
  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ padding: "1rem" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="button" display="block" gutterBottom>
                Login
              </Typography>
              <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormControl sx={{ m: 1 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword.showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText sx={{ color: "#d32f2f" }}>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
              <Stack direction="row" justifyContent="flex-end">
                <Link sx={{ fontSize: "12px" }} href="forgot-password">
                  Forgot password ?
                </Link>
              </Stack>
              {!login.isLoading ? (
                <Button type="submit" variant="contained">
                  Login
                </Button>
              ) : (
                <Stack alignItems="center" justifyContent="center">
                  <CircularProgress color="secondary" />
                </Stack>
              )}
              <Stack direction="row" justifyContent="center">
                <Link sx={{ fontSize: "12px" }} href="signup">
                  Doesn't have an Account ? Signup here
                </Link>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </>
  );
}
