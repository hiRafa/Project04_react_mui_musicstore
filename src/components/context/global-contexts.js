// import { Box, styled } from "@mui/material";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let logoutTimer;

const GlobalContexts = createContext();

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

export function GlobalContextsProvider(props) {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [navMenuRightOpen, setNavMenuRightOpen] = useState(false);
  const navigate = useNavigate();

  // ---------------------  Nagivation Active Button
  // Number 9 is reserved to Signup
  const [navMenuSelectedIndex, setNavMenuSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setNavMenuSelectedIndex(index);
  };

  // ----------- Login or Create Account
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const hasAccountOrNotHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

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
    setIdFromDataBase(null);
    setLocalIdFromAuth(null);
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

  // ----------- Getting Id and Email from authentication firebase (to set it to the database with personal info)
  const [localIdFromAuth, setLocalIdFromAuth] = useState();
  const [emailFromAuth, setEmailFromAuth] = useState();
  const [idFromDataBase, setIdFromDataBase] = useState();

  if (userIsLoggedIn) {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => {
      // fetch get from authentication server, getting only the user corresponding to the current userToken
      resp.json().then((data) => {
        const idFromAuth = data.users[0].localId;
        const emailFromAuth = data.users[0].email;
        setLocalIdFromAuth(idFromAuth);
        setEmailFromAuth(emailFromAuth);
      });
    });
  }

  if (userIsLoggedIn) {
    fetch(
      "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
    ).then((resp) => {
      // fetch get from authentication server, getting only the user corresponding to the current userToken
      resp.json().then((data) => {
        // console.log(data);
        for (const key in data) {
          // console.log(data[key].userId);
          if (data[key].userId === localIdFromAuth) {
            setIdFromDataBase(data[key].userId);
          } else if (data[key].userId === null) {
            console.log(
              "allow form for inputting profile data to show and allow user to set new information"
            );
          } else if (data[key].userId !== localIdFromAuth) {
            console.log(
              `${data[key].userId} is different than ${localIdFromAuth}`
            );
            return;
          }
        }
        console.log(idFromDataBase);
      });
    });
  }

  if (!userIsLoggedIn) {
    console.log(idFromDataBase);
    console.log(localIdFromAuth);
  }

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
        isLogin,
        setIsLogin,
        isLoading,
        setIsLoading,
        hasAccountOrNotHandler,

        userToken: token,
        userIsLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        token,

        localIdFromAuth,
        setLocalIdFromAuth,
        emailFromAuth,
        setEmailFromAuth,

        navigate,
      }}
    >
      {props.children}
    </GlobalContexts.Provider>
  );
}

export default GlobalContexts;
