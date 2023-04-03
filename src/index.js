import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import store from "./store/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
const queryClient = new QueryClient();

let persistor = persistStore(store);

const appTheme = createTheme({
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
          borderTop: "8px solid #205295",
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
      main: "#144272",
    },
    secondary: {
      main: "#205295",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <ThemeProvider theme={appTheme}> */}
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        {/* </ThemeProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
