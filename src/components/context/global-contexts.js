// import { Box, styled } from "@mui/material";
import React, { createContext, useContext, useEffect, useState } from "react";
import LoginTokenContexts from "./login-token-context";

const GlobalContexts = createContext();

export function GlobalContextsProvider(props) {
  const { token, userIsLoggedIn } = useContext(LoginTokenContexts);

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
  // userInfo stores either false if it doesnt exist, or the user data if the user exists.
  const [userInfo, setUserInfo] = useState();
  const [userKey, setUserKey] = useState();

  const fetchUserInfo = () => {
    if (userIsLoggedIn) {
      fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      ).then((resp) => {
        // fetch get from authentication server, getting only the user corresponding to the current userToken
        resp.json().then((data) => {
          const doesExist = (obj, value) => {
            for (let key in obj) {
              if (obj[key].userId === value) {
                return obj[key];
              }
            }
            return false;
          };
          function getObjKey(obj, value) {
            return Object.keys(obj).find((key) => obj[key].userId === value);
          }

          setUserInfo(doesExist(data, localIdFromAuth));
          setUserKey(getObjKey(data, localIdFromAuth));
          // check if it is returning true when logging in with an account that has data registered in the realtime database
          // console.log(userInfo);
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
    if (!userIsLoggedIn) {
      setUserInfo();
      setUserKey();
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [userIsLoggedIn, localIdFromAuth]);

  console.log(userKey);

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

        userInfo,
        setUserInfo,
        userKey,
        setUserKey,

        localIdFromAuth,
        setLocalIdFromAuth,
        localEmailFromAuth,
        setEmailFromAuth,

        fetchUserInfo,
      }}
    >
      {props.children}
    </GlobalContexts.Provider>
  );
}

export default GlobalContexts;
