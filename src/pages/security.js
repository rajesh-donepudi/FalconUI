import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/loader";
import { useState } from "react";
import AppModal from "../components/modal";
import axiosInstance from "../utils/axios";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Toolbar from "@mui/material/Toolbar";
import TableTitle from "../components/table-title";
import { FLOBoldTableCell } from "../components/table-bold-cell";
import RenderRelativeTime from "../components/relative-time";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import SecurityIcon from "@mui/icons-material/Security";
import AddNewPolicy from "./forms/add-new-policy-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddClaimToPolicy from "./forms/add-claim-to-policy-form";
import EditIcon from "@mui/icons-material/Edit";

export function EnhancedTableToolbar(props) {
  return <Toolbar>{props.children}</Toolbar>;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AccessManagement() {
  const [dialogState, setDialogState] = useState({
    visible: false,
    payload: {},
    action: "",
  });

  const [selectedAction, setSelectedAction] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery("fetch-policies", () => {
    return axiosInstance
      .get("api/PolicyManagement/get-all-policies")
      .then((r) => r.data);
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const addNewPolicyMutation = useMutation(
    (payload) => {
      return axiosInstance.post(
        "/api/PolicyManagement/create-new-policy",
        payload,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: async (data, variables, context) => {
        closeDialog();
        queryClient.invalidateQueries({ queryKey: ["fetch-policies"] });
      },
      onSettled: async () => {},
    }
  );

  const closeDialog = () => {
    setDialogState((o) => {
      return {
        ...o,
        visible: false,
      };
    });
  };

  const addNewClaimToPolicy = useMutation(
    (payload) => {
      return axiosInstance.post(
        "/api/ClaimManagement/create-new-claim",
        payload,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: async (data, variables, context) => {
        //navigate("/access-management");
        closeDialog();
        queryClient.invalidateQueries({ queryKey: ["fetch-policies"] });
      },
      onSettled: async () => {},
    }
  );

  const deleteClaimMutation = useMutation(
    (payload) => {
      return axiosInstance.delete(
        "/api/ClaimManagement/delete-claim?claimId=" + payload,
        payload,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: async (data, variables, context) => {
        //navigate("/access-management");
        closeDialog();
        queryClient.invalidateQueries({ queryKey: ["fetch-policies"] });
      },
      onSettled: async () => {},
    }
  );

  const onAddNewPolicy = (payload) => {
    addNewPolicyMutation.mutate(payload);
  };

  const onAddNewClaimToPolicy = (payload) => {
    const {
      policyId,
      name: claimName,
      values: claimValues,
      description,
    } = payload;
    addNewClaimToPolicy.mutate({
      policyId: policyId,
      type: claimName,
      value: claimValues,
      description,
    });
  };

  const getModalContent = (payload) => {
    switch (dialogState.action) {
      case "ADD_POLICY":
        return <AddNewPolicy mode="create" onSubmit={onAddNewPolicy} />;
      case "ADD_CLAIM":
        const { policyId, name } = dialogState.payload;
        return (
          <AddClaimToPolicy
            onSubmit={onAddNewClaimToPolicy}
            name={name}
            mode="create"
            policyId={policyId}
          />
        );
      case "EDIT_CLAIM":
        return (
          <AddClaimToPolicy
            onSubmit={onAddNewClaimToPolicy}
            name={dialogState.payload.type}
            policyId={dialogState.payload.applicationPolicyId}
            mode="edit"
            formData={dialogState.payload}
          />
        );
      default:
        break;
    }
  };

  const onAddC = (payload) => {
    setDialogState((o) => {
      return {
        ...o,
        visible: payload.visible,
        action: payload.action,
        payload: payload.payload,
      };
    });
  };

  const onEdit = (payload) => {
    setDialogState((o) => {
      return {
        ...o,
        visible: payload.visible,
        action: payload.action,
        payload: payload.payload,
      };
    });
  };

  const onDelete = (id) => {
    deleteClaimMutation.mutate(id);
  };

  const deletePolicyMutation = useMutation(
    (payload) => {
      return axiosInstance.delete(
        "/api/PolicyManagement/delete-policy?policyId=" + payload,
        payload,
        {
          withCredentials: true,
        }
      );
    },
    {
      onSuccess: async (data, variables, context) => {
        //navigate("/access-management");
        closeDialog();
        queryClient.invalidateQueries({ queryKey: ["fetch-policies"] });
      },
      onSettled: async () => {},
    }
  );

  const onDeletePolicy = (id) => {
    console.log("ID:", id);
    deletePolicyMutation.mutate(id);
  };

  return (
    <>
      <AppModal
        open={dialogState.visible}
        onClose={() =>
          setDialogState((o) => {
            return {
              ...o,
              visible: false,
            };
          })
        }
      >
        {getModalContent()}
      </AppModal>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <Stack alignItems="center">
            <Loader />
          </Stack>
        </Box>
      ) : (
        <Stack direction="column" spacing={1}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Tooltip title="Add new user">
              <Button
                onClick={(o) =>
                  setDialogState(() => {
                    return {
                      ...o,
                      visible: true,
                      action: "ADD_POLICY",
                    };
                  })
                }
                variant="contained"
              >
                <AddIcon />
                Add new policy
              </Button>
            </Tooltip>
          </Stack>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar>
                <SecurityIcon /> <TableTitle title="Authorization Policies" />
              </EnhancedTableToolbar>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-labelledby="tableTitle" size="medium">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <FLOBoldTableCell fontSize="12px" content="Policy Name" />
                      <FLOBoldTableCell fontSize="12px" content="Tenant ID" />
                      <FLOBoldTableCell fontSize="12px" content="Created On" />
                      <FLOBoldTableCell
                        fontSize="12px"
                        content="Last Modified"
                      />
                      <FLOBoldTableCell fontSize="12px" content="" />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.response?.map((row) => (
                      <Row
                        key={row.name}
                        row={row}
                        addHandler={onAddC}
                        onDelete={onDelete}
                        editHandler={onEdit}
                        deletePolicy={onDeletePolicy}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[1, 5, 10, 25]}
                component="div"
                count={data?.response?.length ?? 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </Stack>
      )}
    </>
  );
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {row.tenantId}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          <RenderRelativeTime val={row.createdOn} />
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {/* <ReactTimeAgo date={row?.modifiedOn} locale="en-US" /> */}
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          <Stack gap={1} flexDirection="row">
            <Button
              onClick={() =>
                props.addHandler({
                  visible: true,
                  action: "ADD_CLAIM",
                  payload: {
                    policyId: row.id,
                    name: row.name,
                  },
                })
              }
              variant="outlined"
              size="small"
            >
              <AddIcon />
              Add Claim
            </Button>
            <IconButton aria-label="Example">
              <EditIcon sx={{ color: "darkblue" }} />
            </IconButton>
            <IconButton
              onClick={() => props.deletePolicy(row.id)}
              aria-label="Example"
            >
              <DeleteIcon sx={{ color: "darkred" }} />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 20, paddingTop: 20 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 900 }}
                gutterBottom
                component="div"
              >
                Policy Claims
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <FLOBoldTableCell
                      fontWeight="400"
                      fontSize="0.6rem"
                      color="#778899"
                      content="Claim Name"
                    />
                    <FLOBoldTableCell
                      fontWeight="400"
                      fontSize="0.6rem"
                      color="#778899"
                      content="Claim Values"
                    />
                    <FLOBoldTableCell
                      fontWeight="400"
                      fontSize="0.6rem"
                      color="#778899"
                      content="Created On"
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.policyClaims.map((historyRow) => (
                    <StyledTableRow
                      key={historyRow.date}
                      sx={{ border: "none" }}
                    >
                      <TableCell component="th" scope="row">
                        {historyRow.type}
                      </TableCell>
                      <TableCell>{historyRow.value}</TableCell>
                      <TableCell>
                        <RenderRelativeTime val={historyRow.createdOn} />
                      </TableCell>
                      <TableCell>
                        <Stack flexDirection="row" gap={1}>
                          <IconButton
                            onClick={() =>
                              props.editHandler({
                                visible: true,
                                action: "EDIT_CLAIM",
                                payload: historyRow,
                              })
                            }
                            aria-label="Example"
                          >
                            <EditIcon sx={{ color: "darkblue" }} />
                          </IconButton>
                          <IconButton
                            onClick={(e) => props.onDelete(historyRow.id)}
                            aria-label="Example"
                          >
                            <DeleteIcon sx={{ color: "darkred" }} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
