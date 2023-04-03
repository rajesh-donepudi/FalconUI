import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { CreateNewPolicyValidationScheme } from "../../validation-schemes/validation-schemes";

const AddNewPolicy = (props) => {
  const { mode: viewMode, name } = props;

  const getFormData = () => {
    switch (viewMode) {
      case "edit":
        return {
          name: name,
        };
      case "create":
        return {
          name: "",
        };
      default:
        return;
    }
  };

  const formik = useFormik({
    initialValues: getFormData(),
    validationSchema: CreateNewPolicyValidationScheme,
    onSubmit: props.onSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="button" display="block" gutterBottom>
            New policy
          </Typography>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Stack>
      </form>
    </>
  );
};

export default AddNewPolicy;
