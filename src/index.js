import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles"; // Update import for ThemeProvider
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      preventDuplicate
    >
      <ThemeProvider theme={theme}>
       
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
