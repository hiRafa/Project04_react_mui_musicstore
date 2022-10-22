import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { GlobalCSSContextProvider } from "./components/context/globalCSS-context";
import { GlobalContextsProvider } from "./components/context/global-contexts";
import { LoginTokenProvider } from "./components/context/login-token-context";
import { CardsContextProvider } from "./components/context/cards-context";
import { CartContextProvider } from "./components/context/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CartContextProvider>
        <LoginTokenProvider>
          <GlobalContextsProvider>
            <CardsContextProvider>
              <GlobalCSSContextProvider>
                <App />
              </GlobalCSSContextProvider>
            </CardsContextProvider>
          </GlobalContextsProvider>
        </LoginTokenProvider>
      </CartContextProvider>
    </ThemeProvider>
  </BrowserRouter>
);
