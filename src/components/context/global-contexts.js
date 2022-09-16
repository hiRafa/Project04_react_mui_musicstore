// import { Box, styled } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import LoginContent from "./login-token-context";

const GlobalContexts = createContext();

export function GlobalContextsProvider(props) {
  const { token, userIsLoggedIn } = useContext(LoginContent);

  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [navMenuRightOpen, setNavMenuRightOpen] = useState(false);

  // ---------------------  Nagivation Active Button
  // Number 9 is reserved to Signup
  const [navMenuSelectedIndex, setNavMenuSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setNavMenuSelectedIndex(index);
  };

  // ----------- Login or Create Account
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState();

  const hasAccountOrNotHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  // ----------- Getting Id and Email from authentication firebase (to set it to the database with personal info)
  const [localIdFromAuth, setLocalIdFromAuth] = useState();
  const [localEmailFromAuth, setEmailFromAuth] = useState();

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

        // setting the collected data to the state. and later using that state to set to firebase realtime database
        setLocalIdFromAuth(idFromAuth);
        setEmailFromAuth(emailFromAuth);
      });
    });
  }

  // ------- Check if the Auth ID corresponds to the ID in the database (if it does exist, or not)
  const [userIdExists, setUserIdExists] = useState();
  useEffect(() => {
    if (userIsLoggedIn) {
      fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      ).then((resp) => {
        // fetch get from authentication server, getting only the user corresponding to the current userToken
        resp.json().then((data) => {
          // console.log(data);
          const doesExist = (obj, value) => {
            for (let key in obj) {
              if (obj[key].userId === value) {
                return true;
              }
            }
            return false;
          };

          setUserIdExists(doesExist(data, localIdFromAuth));

          // check if it is returning true when logging in with an account that has data registered in the realtime database
          // console.log(userIdExists);
          // console.log(localIdFromAuth);

          // this expressions were returning true or false for each key
          // let findUserIdInDTBase = Object.keys(data).some(
          //   (key) => data[key] === localIdFromAuth
          // );
          // console.log(findUserIdInDTBase);
          // for (const key in data) {
          //   let findUserIdInDTBase = Object.values(data[key]).includes(
          //     localIdFromAuth
          //   );
          //   console.log(findUserIdInDTBase);
        });
      });
    }
  }, [userIsLoggedIn, localIdFromAuth]);

  useEffect(() => {
    if (userIsLoggedIn) {
      fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      ).then((resp) => {
        resp.json().then((data) => {});
      });
    }
  });

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
        userIdExists,
        setUserIdExists,

        localIdFromAuth,
        setLocalIdFromAuth,
        localEmailFromAuth,
        setEmailFromAuth,
      }}
    >
      {props.children}
    </GlobalContexts.Provider>
  );
}

export default GlobalContexts;
