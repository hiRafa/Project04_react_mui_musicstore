import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { GlobalCSSContextProvider } from "./components/context/globalCSS-context";
import { GlobalContextsProvider } from "./components/context/global-contexts";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./components/context/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <GlobalContextsProvider>
          <GlobalCSSContextProvider>
            <App />
          </GlobalCSSContextProvider>
        </GlobalContextsProvider>
      </AuthContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
