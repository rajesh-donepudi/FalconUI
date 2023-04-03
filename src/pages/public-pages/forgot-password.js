import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { ForgotPasswordValidationScheme } from "../../validation-schemes/validation-schemes";

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "foobar@example.com",
    },
    validationSchema: ForgotPasswordValidationScheme,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Stack direction="row" justifyContent="center">
        <Paper sx={{ padding: "1rem" }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography variant="button" display="block" gutterBottom>
                Forgot Password
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ color: "grey" }}
              >
                Please enter your email we'll send password reset instructions
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
              <Button variant="contained" type="submit">
                SEND
              </Button>
              <Stack direction="row" justifyContent="center">
                <Link sx={{ fontSize: "12px" }} href="login">
                  Back to Login
                </Link>
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </>
  );
}
