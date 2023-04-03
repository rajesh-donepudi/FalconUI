import { Paper, Stack, Typography } from "@mui/material";
import store from "../../store/store";
import Utilities from "../../utils/utilities";
import RenderRelativeTime from "../../components/relative-time";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AppPaper from "../../components/app-paper";
const UserProfile = () => {
  const user = store.getState().auth.user;
  return (
    <div className="page-body" style={{ padding: "1rem", overflow: "hidden" }}>
      <AppPaper>
        <div className="row">
          <div className="col px-4 py-4">
            <div className="row">
              <div className="d-flex col justify-content-center">
                <Stack flexDirection="row" gap={1} alignItems="center">
                  <AccountCircleOutlinedIcon />
                  <Typography
                    sx={{ textTransform: "uppercase", fontWeight: "900" }}
                  >
                    Profile
                  </Typography>
                </Stack>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Stack>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    First Name
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {user.firstName}
                  </Typography>
                </Stack>
              </div>
              <div className="col">
                <Stack>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    Last Name
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {user.lastName}
                  </Typography>
                </Stack>
              </div>
              <div className="col">
                <Stack>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    USER ID
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {user.id}
                  </Typography>
                </Stack>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Stack>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    Tenant ID
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {user.tenantId}
                  </Typography>
                </Stack>
              </div>
            </div>
            <div className="row">
              <div className="col-12" style={{ maxWidth: "80vw" }}>
                <Stack>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    Access Token
                  </Typography>
                  <Typography
                    className="font-monospace text-break"
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    {user.jwtToken}
                  </Typography>
                </Stack>
              </div>
            </div>
            <div className="row">
              <div className="col-12" style={{ maxWidth: "80vw" }}>
                <Stack>
                  <Typography
                    variant="overline"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "12px",
                      color: "grey",
                    }}
                  >
                    Refresh Token
                  </Typography>
                  <Typography
                    className="font-monospace text-break"
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    {user.refreshToken}
                  </Typography>
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </AppPaper>
    </div>
  );
};

export default UserProfile;
