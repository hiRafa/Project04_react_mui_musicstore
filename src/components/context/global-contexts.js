// import { Box, styled } from "@mui/material";
import React, { createContext, useState } from "react";

const GlobalContexts = createContext({
  userToken: "",
  userIsLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export function GlobalContextsProvider(props) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [navMenuRightOpen, setNavMenuRightOpen] = useState(false);
  const [hasAccount, setHasAccount] = useState(true);

  // Nagivation Active Button
  // Number 9 is reserved to Signup
  const [navMenuSelectedIndex, setNavMenuSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setNavMenuSelectedIndex(index);
  };

  const hasAccountOrNotHandler = () => {
    setHasAccount((prevState) => !prevState);
  };

  // --------------------- Logged In + Token Authentication
  //infering from token to see if user is logged in
  const [token, setToken] = useState(null);

  // converting to a true or false value (token, !token returns truthy or falsy)
  // if token is empty than false. if token is not empty, then true.
  const userIsLoggedIn = !!token;

  //if it is logged in, then set the token to the token
  const loginHandler = (token) => {
    setToken(token);
  };

  //if it is logged out, then set the token to null
  const logoutHandler = () => {
    setToken(null);
  };

  return (
    <GlobalContexts.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        navMenuRightOpen,
        setNavMenuRightOpen,
        navMenuSelectedIndex,
        setNavMenuSelectedIndex,
        handleNavItemClick: handleListItemClick,
        hasAccount,
        setHasAccount,
        hasAccountOrNotHandler,

        userToken: token,
        userIsLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </GlobalContexts.Provider>
  );
}

export default GlobalContexts;
