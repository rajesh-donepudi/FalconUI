import { Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import "../../../src/index.css";
import TableTitle from "../../components/table-title";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import RenderRelativeTime from "../../components/relative-time";
import Loader from "../../components/loader";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import AppSwitch from "../../components/app-switch";
import AppPaper from "../../components/app-paper";
import Utilities from "../../utils/utilities";

const ManageUser = () => {
  const [personName, setPersonName] = useState([]);
  const queryClient = useQueryClient();

  const params = useLocation();

  const id = params.pathname.split("/")[2];

  const { data, isLoading } = useQuery("get-user", () => {
    return axiosInstance
      .get("api/Account/get-user?userId=" + id)
      .then((r) => r.data);
  });

  const user = data?.response;

  const emailConfirmedMutation = useMutation(
    (payload) => {
      return axiosInstance.patch(
        `api/Account/${payload.userId}/email-confirmed/${payload.value}`,
        payload,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: async (data, variables, context) => {
        //navigate("/access-management");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      },
      onSettled: async () => {},
    }
  );

  const handleEmailConfirmed = (userId, value) => {
    emailConfirmedMutation.mutate({
      userId,
      value,
    });
  };
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" gutterBottom>
        <Link underline="hover" color="inherit" href="/dashboard">
          Dashboard
        </Link>
        <Link underline="hover" color="inherit" href="/users">
          Users
        </Link>
        <Typography color="text.primary">Manage User</Typography>
      </Breadcrumbs>
      <AppPaper
        sx={{ width: "100%", height: "80vh", padding: "1.5rem" }}
        elevation={1}
      >
        <div className="title-wrapper" style={{ padding: "1rem" }}>
          <div className="d-flex page-title align-items-center">
            <AccountCircleIcon /> <TableTitle title="Manage User" />
          </div>
        </div>
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <Stack alignItems="center">
              <Loader />
            </Stack>
          </Box>
        ) : (
          <div className="page-body" style={{ padding: "1rem" }}>
            <Paper variant="outlined" style={{ padding: "1rem" }}>
              <div className="row">
                <div className="col">
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
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
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
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
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
                          username
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {user.email}
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
                          PHONE
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {user.phoneNumber}
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
                          Email confirmed
                        </Typography>
                        <AppSwitch
                          value={user.emailConfirmed}
                          onValueChange={(e) => {
                            console.log(e.target.checked);
                            handleEmailConfirmed(user.id, e.target.checked);
                          }}
                        />
                        {/* <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {Utilities.formatBoolean(user.emailConfirmed)}
                        </Typography> */}
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
                          PHONE CONFIRMED
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {Utilities.formatBoolean(user.phoneNumberConfirmed)}
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
                          TWO FACTOR ENABLED
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {Utilities.formatBoolean(user.twoFactorEnabled)}
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
                          LOCKOUT ENABLED
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {Utilities.formatBoolean(user.lockoutEnabled)}
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
                          Created On
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          <RenderRelativeTime val={user.createdOn} />
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
                          username
                        </Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          {user.userName}
                        </Typography>
                      </Stack>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </Paper>
          </div>
        )}
      </AppPaper>
    </>
  );
};

export default ManageUser;
