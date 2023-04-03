import { useStore } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import useAxiosPrivate from "./utils/setup-interceptor";
import { useQuery } from "react-query";
import axiosInstance from "./utils/axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const store = useStore();
  useAxiosPrivate(store);

  const [theme, setTheme] = useState();

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
    setTheme(themeSettingResponse?.response);
  }, [themeSettingResponse]);

  const getPrimaryColor = () => {
    return theme?.find((x) => x.name === "primaryColor")?.value;
  };

  const getSecondaryColor = () => {
    return theme?.find((x) => x.name === "secondaryColor")?.value;
  };

  const componentToHex = (c) => {
    var hex = c?.toString(16);
    return hex?.length == 1 ? "0" + hex : hex;
  };

  // const rgbToHex = (r, g, b) => {
  //   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  // };

  const rgbToHex = (r, g, b) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x?.toString(16);
        return hex?.length === 1 ? "0" + hex : hex;
      })
      .join("");

  const getTheme = () => {
    return createTheme({
      components: {
        MuiTypography: {
          styleOverrides: {
            root: {
              fontFamily: "'DM Sans', sans-serif;",
              fontWeight: 400,
              letterSpacing: "0.1rem",
              fontSize: "14px",
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              // fontFamily: "'Urbanist', sans-serif;",
              fontFamily: "'DM Sans', sans-serif;",
              fontWeight: 400,
              fontSize: "10px",
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              fontSize: "10px",
            },
          },
        },
        MuiDialogTitle: {
          styleOverrides: {
            root: {
              borderTop: `8px solid ${getSecondaryColor()}`,
              // borderStyle: "solid",
              // borderTopWidth: "8px",
              // borderBlock
            },
          },
        },
        MuiIcon: {
          styleOverrides: {
            root: {
              color: "red",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            },
          },
        },
      },
      palette: {
        primary: {
          main: getPrimaryColor() ?? "rgb(248,248,255)",
        },
        secondary: {
          main: getSecondaryColor() ?? "rgb(248,248,255)",
        },
      },
    });
  };

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={getTheme()}>
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
