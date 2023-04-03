import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { CreateNewPolicyValidationScheme } from "../../validation-schemes/validation-schemes";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const AddClaimToPolicy = (props) => {
  const [loading, setLoading] = useState(false);
  function handleClick() {
    setLoading(true);
  }

  const getFormData = () => {
    const { mode: viewMode, formData, policyId, name } = props;

    switch (viewMode) {
      case "edit":
        console.log("ss", formData);
        return {
          name: name,
          policyId: policyId,
          values: formData?.value,
          description: formData?.description,
        };
      case "view":
        break;
      case "create":
        return {
          name: "",
          policyId: props.policyId,
          values: "",
          description: "",
        };
        break;
      default:
        break;
    }
  };

  const formik = useFormik({
    initialValues: getFormData(),
    validationSchema: CreateNewPolicyValidationScheme,
    onSubmit: (data) => {
      handleClick();
      props.onSubmit(data);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="button" display="block" gutterBottom>
            New Claim
          </Typography>
          <TextField
            id="policyId"
            disabled
            name="policyId"
            label="Selected Policy"
            variant="outlined"
            value={props.name}
            onChange={formik.handleChange}
          />
          <TextField
            id="name"
            required
            name="name"
            label="Name"
            variant="outlined"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField
            id="outlined-multiline-static"
            label="Values"
            name="values"
            required
            multiline
            rows={4}
            value={formik.values.values}
            onChange={formik.handleChange}
            helperText={
              "Multiple values are allowed using comma as a delimeter"
            }
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            name="description"
            required
            multiline
            rows={4}
            value={formik.values.description}
            onChange={formik.handleChange}
            helperText={
              "Multiple values are allowed using comma as a delimeter"
            }
          />
          {!loading ? (
            <Button type="submit" variant="contained">
              Create
            </Button>
          ) : (
            <Stack alignItems="center" justifyContent="center">
              <CircularProgress color="secondary" />
            </Stack>
          )}
        </Stack>
      </form>
    </>
  );
};

export default AddClaimToPolicy;
