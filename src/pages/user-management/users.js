import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { useState } from "react";
import AppModal from "../../components/modal";
import AddIcon from "@mui/icons-material/Add";
import CreateNewUser from "../forms/create-new-user-form";
import AppPaper from "../../components/app-paper";
import UsersTable from "../../features/user-management/components/users-table";

export default function Users() {
  const [dialogState, setDialogState] = useState(false);

  const addNewUser = () => {
    setDialogState(true);
  };

  return (
    <>
      <AppModal open={dialogState} onClose={() => setDialogState(false)}>
        <CreateNewUser message="Successfull" />
      </AppModal>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" justifyContent="flex-end">
          <Tooltip title="Add new user">
            <Button onClick={addNewUser} icon variant="contained">
              <AddIcon />
              Add new user
            </Button>
          </Tooltip>
        </Stack>
        <Box sx={{ width: "100%" }}>
          <AppPaper>
            <UsersTable />
          </AppPaper>
        </Box>
      </Stack>
    </>
  );
}
