import React, { createContext } from "react";
import { useState } from "react";

const AuthContext = createContext({
  usertoken: "",
  userIsLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  //infering from token to see if user is logged in
  const [token, setToken] = useState(null);

  // converting to a true or false value (token, !token returns truthy or falsy)
  // if token is empty than false. if token is not empty, then true.
  const userIsLoggedIn = !!token;

  //if it is logged out, then set the token to null
  const logoutHandler = (token) => {
    setToken(null);
  };

  //if it is logged in, then set the token to the token
  // for security reasons, we only set the token after logged in
  // in order to perform other tasks such as resetting passwords
  const loginHandler = (token) => {
    setToken(token);
  };

  const contextValue = {
    usertoken: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
