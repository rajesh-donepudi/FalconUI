import { useState } from "react";

const UserProfileEdit = () => {
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

  const { data, isLoading } = useQuery("get-user", () => {
    return axiosInstance
      .get("api/Account/get-user?userId=" + id)
      .then((r) => r.data);
  });

  const formik = useFormik({
    initialValues: {
      firstname: "foobar@example.com",
      lastname: "foobar",
      userName: "raj",
      email: "foobar@example.com",
      phoneNumber: "8886014996",
      password: "password",
      confirmPassword: "password",
      emailConfirmed: "",
      phoneNumberConfirmed: "",
      twoFactorEnabled: "",
      lockoutEnabled: "",
      createdOn: "",
    },
    validationSchema: SignupValidationSchema,
    onSubmit: (values) => {
      signup.mutate(values);
    },
  });
  return (
    <div>
      <Stack direction="row" justifyContent="center">
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
                    formik.touched.firstname && Boolean(formik.errors.firstname)
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
                  helperText={formik.touched.lastname && formik.errors.lastname}
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
                  helperText={formik.touched.username && formik.errors.username}
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
                      formik.touched.password && Boolean(formik.errors.password)
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
      </Stack>
    </div>
  );
};

export default UserProfileEdit;
