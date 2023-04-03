import { MuiColorInput } from "mui-color-input";
import { Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import { ThemeColorFormValidationSchema } from "../../validation-schemes/validation-schemes";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "../../utils/axios";
const ThemeConfig = () => {
  const [themeSettings, setThemeSettings] = useState([]);

  const { data: themeSettingResponse, isLoading } = useQuery(
    "fetch-theme",
    () => {
      return axiosInstance.get("api/Settings/type/1").then((r) => r.data);
    },
    {
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (themeSettingResponse?.response) {
      setThemeSettings(themeSettingResponse?.response);
    }
  }, [themeSettingResponse?.response]);

  const updateSetting = useMutation(
    (payload) => {
      return axiosInstance.patch("/api/Settings", payload, {
        withCredentials: true,
      });
    },
    {
      onSuccess: async (data, variables, context) => {},
      onSettled: async () => {
        console.log("I'm second!");
      },
    }
  );

  const getPrimaryColor = () => {
    return themeSettings?.find((x) => x.name === "primaryColor")?.value ?? "";
  };

  const getSecondaryColor = () => {
    return themeSettings?.find((x) => x.name === "secondaryColor")?.value ?? "";
  };

  const formik = useFormik({
    initialValues: {
      primaryColor: getPrimaryColor(),
      secondaryColor: getSecondaryColor(),
    },
    validationSchema: ThemeColorFormValidationSchema,
    onSubmit: (payload) => {
      updateSetting.mutate(themeSettings);
    },
  });

  useEffect(() => {
    formik.values.primaryColor = getPrimaryColor();
    formik.values.secondaryColor = getSecondaryColor();
  }, [formik.values, themeSettings]);

  const updatePrimaryColor = (settings, updatedColor) => {
    let index = themeSettings.findIndex((x) => x.name === "primaryColor");
    settings[index].value = updatedColor;
    setThemeSettings(settings);
  };

  const updateSecondaryColor = (settings, updatedColor) => {
    let index = themeSettings.findIndex((x) => x.name === "secondaryColor");
    settings[index].value = updatedColor;
    setThemeSettings(settings);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Stack flexGrow={0}>
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="column" spacing={4}>
            <MuiColorInput
              name="primaryColor"
              id="primaryColor"
              label="Primary color"
              value={getPrimaryColor()}
              onChange={(e) => updatePrimaryColor(themeSettings, e)}
              error={
                formik.touched.primaryColor &&
                Boolean(formik.errors.primaryColor)
              }
              helperText={
                formik.touched.primaryColor && formik.errors.primaryColor
              }
            />
            <MuiColorInput
              id="secondaryColor"
              name="secondaryColor"
              label="Secondary color"
              value={getSecondaryColor()}
              onChange={(e) => updateSecondaryColor(themeSettings, e)}
              error={
                formik.touched.secondaryColor &&
                Boolean(formik.errors.secondaryColor)
              }
              helperText={
                formik.touched.secondaryColor && formik.errors.secondaryColor
              }
            />
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Stack>
        </form>
      </Stack>
      <Stack flexGrow={1}>
        <TextField
          id="outlined-multiline-static"
          label="Theme"
          multiline
          rows={8}
          defaultValue="Default Value"
        />
      </Stack>
    </Stack>
  );
};

export default ThemeConfig;
