import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { SignupValidationSchema } from "../../validation-schemes/validation-schemes";
import { useFormik } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import Success from "../../components/success";
import { useMutation } from "react-query";
import axiosInstance from "../../utils/axios";
import { CircularProgress } from "@mui/material";

export default function CreateNewUser(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const onClickShowPassword = () => {
    setShowPassword((old) => !old);
  };

  const onClickShowConfirmPassword = () => {
    setShowConfirmPassword((old) => !old);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signup = useMutation(
    (payload) => {
      return axiosInstance.post("api/Account/register-new-user", payload, {
        withCredentials: false,
      });
    },
    {
      onSuccess: async (data, variables, context) => {
        setShowSuccess(true);
      },
      onSettled: async () => {
        console.log("I'm second!");
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
    },
    validationSchema: SignupValidationSchema,
    onSubmit: (values) => {
      signup.mutate(values);
    },
  });

  return (
    <>
      <Stack direction="row" justifyContent="center">
        {showSuccess && <Success message={props.message} />}
        {!showSuccess && (
          <Paper sx={{ padding: "1rem" }}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <Typography variant="button" display="block" gutterBottom>
                  Signup
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    id="firstname"
                    name="firstname"
                    label="First name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstname &&
                      Boolean(formik.errors.firstname)
                    }
                    helperText={
                      formik.touched.firstname && formik.errors.firstname
                    }
                  />
                  <TextField
                    id="lastname"
                    name="lastname"
                    label="Last name"
                    variant="outlined"
                    fullWidth
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastname && Boolean(formik.errors.lastname)
                    }
                    helperText={
                      formik.touched.lastname && formik.errors.lastname
                    }
                  />
                </Stack>
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
                <Stack direction="row" spacing={2}>
                  <TextField
                    name="username"
                    id="username"
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                  <TextField
                    name="phoneNumber"
                    id="phoneNumber"
                    label="phone"
                    fullWidth
                    variant="outlined"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={onClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    <FormHelperText sx={{ color: "#d32f2f" }}>
                      {formik.touched.password && formik.errors.password}
                    </FormHelperText>
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={onClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
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
                      {formik.touched.confirmPassword &&
                        formik.errors.confirmPassword}
                    </FormHelperText>
                  </FormControl>
                </Stack>

                <Stack direction="row" justifyContent="flex-end">
                  {/* <FormControlLabel
                sx={{ fontSize: "12px" }}
                control={<Checkbox defaultChecked />}
                label="I Agree Terms & Conditions"
              /> */}
                  <Link sx={{ fontSize: "12px" }} href="forgot-password">
                    Forgot password ?
                  </Link>
                </Stack>
                {!signup.isLoading ? (
                  <Button type="submit" variant="contained">
                    Signup
                  </Button>
                ) : (
                  <Stack alignItems="center" justifyContent="center">
                    <CircularProgress color="secondary" />
                  </Stack>
                )}
              </Stack>
            </form>
          </Paper>
        )}
      </Stack>
    </>
  );
}
