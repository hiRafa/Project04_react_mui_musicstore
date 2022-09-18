import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import GlobalContexts from "./global-contexts";

const LoginTokenContexts = createContext();

let logoutTimer;

// expiration time to delete token from the local storage
const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainigduration = adjExpirationTime - currentTime;
  return remainigduration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const LoginTokenProvider = (props) => {
  const navigate = useNavigate();

  // --------------------- Logged In + Token Authentication
  //infering from token to see if user is logged in
  // no need for useEffect here because localStorage is a synchronous API
  // checking if we have the token saved on localstorage to keep the user loggedin every reload
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  // converting to a true or false value (token, !token returns truthy or falsy)
  // if token is empty than false. if token is not empty, then true.
  const userIsLoggedIn = !!token;

  //if it is logged out, then set the token to null
  const logoutHandler = useCallback(() => {
    setToken(null);

    localStorage.removeItem("token");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  //if it is logged in, then set the token to the token
  const loginHandler = (token, expirationTime) => {
    setToken(token);
    // function provided by browsers, storing data. 'token' is a key.
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(loginHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  return (
    <LoginTokenContexts.Provider
      value={{
        navigate,

        userToken: token,
        userIsLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        token,
      }}
    >
      {props.children}
    </LoginTokenContexts.Provider>
  );
};

export default LoginTokenContexts;
