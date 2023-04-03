import { Link, Stack } from "@mui/material";
import CreateNewUser from "../forms/create-new-user-form";

export default function Signup() {
  return (
    <>
      <Stack
        direction="column"
        gap={2}
        justifyContent="center"
        alignItems="center"
      >
        <CreateNewUser message="Signup success" />
        <Link sx={{ fontSize: "12px" }} href="login">
          Back to Login
        </Link>
      </Stack>
    </>
  );
}
