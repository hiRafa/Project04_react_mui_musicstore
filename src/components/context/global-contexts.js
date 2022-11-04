// import { Box, styled } from "@mui/material";
// import { type } from "@testing-library/user-event/dist/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import LoginTokenContexts from "./login-token-context";

const GlobalContexts = createContext();

export function GlobalContextsProvider(props) {
  // ---------------------  Menus and screen size
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // ---------------------  Nagivation Active Button
  // Number 9 is reserved to Signup
  const [navMenuSelectedIndex, setNavMenuSelectedIndex] = useState(0);

  // ----------- Login or Create Account
  const { token, userIsLoggedIn } = useContext(LoginTokenContexts);

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState();
  const [httpError, setHttpError] = useState(null);

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

  // --------------------------- Fetch users and ↓↓↓
  // ---------- Check if the Auth ID corresponds to the ID in the database (if it does exist, or not)
  // userInfo stores either false if it doesnt exist, or the user data if the user exists.
  const [userInfo, setUserInfo] = useState();
  const [userKey, setUserKey] = useState();

  const fetchUserInfo = () => {
    if (userIsLoggedIn) {
      const fetchingUserInfo = async () => {
        const response = await fetch(
          "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
        ).then();

        if (!response.ok) {
          throw new Error("Something is not right");
        }
        // Gather data
        const responseData = await response.json();
        // console.log(responseData);

        // fetch get from authentication server, getting only the user corresponding to the current userToken

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

        setUserInfo(doesExist(responseData, localIdFromAuth));
        setUserKey(getObjKey(responseData, localIdFromAuth));
      };
      fetchingUserInfo();
    }
    if (!userIsLoggedIn) {
      setUserInfo();
      setUserKey();
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [userIsLoggedIn, localIdFromAuth]);
  // console.log(userKey);

  // --------------------------- Fetch the PRODUCTS for the home page and favorites page
  const [productsArray, setProductsArray] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      const response = await fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/products2.json"
      ).then();

      if (!response.ok) {
        throw new Error("Something is not right");
      }

      const responseData = await response.json();
      // console.log(responseData);

      const helperArray = [];
      Object.keys(responseData).forEach((key) => {
        //   console.log(key); // printing all key of objects on first level
        //   console.log(responseData[key]); // printing all objects on first level
        if (
          typeof responseData[key] === "object" &&
          responseData[key] !== null
        ) {
          // just to make sure that we are getting everything that is an object and not null from our responseData from the most upper level to the deepest nested level.
          Object.keys(responseData[key]).forEach((nestedKey) => {
            // console.log(nestedKey); // printing all keys of objects on second level.
            // console.log(responseData[key][nestedKey]); // printing all nested objects on second level.
            helperArray.push({
              id: nestedKey,
              label: key,
              name: responseData[key][nestedKey].name,
              description: responseData[key][nestedKey].description,
              price: responseData[key][nestedKey].price,
              img: responseData[key][nestedKey].img,
            });
          });
        }
      });
      // console.log(helperArray);

      setProductsArray(helperArray);
      setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  console.log(productsArray);

  // ----------------- Fetch Articles and News
  const [articlesArray, setArticlesArray] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const fetchNews = async () => {
      const response = await fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/news.json"
      ).then();

      // check
      if (!response.ok) {
        throw new Error("Something is not right");
      }

      // Gather data
      const responseData = await response.json();

      // firebase sends an object, we have to change it to array here
      const arrayHelper = [];
      for (const key in responseData) {
        arrayHelper.push({
          id: key,
          date: key,
          title: responseData[key].title,
          by: responseData[key].by,
          description: responseData[key].description,
          review: responseData[key].review,
          img: responseData[key].imageURL,
        });
        // console.log("number2");
      }
      setArticlesArray(arrayHelper); //setting the fetched data with useState
      setIsLoading(false);
      // console.log("number3");
    };
    fetchNews().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    // console.log("number1");
  }, []);

  // ------------ 5 most recent news IDs
  const helper = [];
  const top5NewsArray = [];
  if (articlesArray) {
    articlesArray.map((news) => helper.push(news.id));
    // console.log(helper);
    const find5RecentNews = () => {
      helper.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0));
    };
    find5RecentNews();

    const top5NewsIDs = helper.slice(0, 5);
    // console.log(top5NewsIDs); // most recent id to least new
    articlesArray.map(
      (news) => top5NewsIDs.includes(news.id) && top5NewsArray.unshift(news)
    );
    // console.log(top5NewsArray);
  }

  // ----------- Favorites Array
  // creating an array with all the values inside the user favorites IDs
  const userFavsArr = [];
  if (userInfo && userInfo.favoritesIDs) {
    Object.values(userInfo.favoritesIDs).forEach((nestedValue) => {
      Object.values(nestedValue).forEach((value) => {
        userFavsArr.push(value);
      });
    });
  }
  // console.log(userFavsArr.length);

  return (
    <GlobalContexts.Provider
      value={{
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,

        navMenuSelectedIndex,
        setNavMenuSelectedIndex,

        isLogin,
        setIsLogin,
        isLoading,
        setIsLoading,

        userInfo,
        setUserInfo,
        userKey,
        setUserKey,

        localIdFromAuth,
        setLocalIdFromAuth,
        localEmailFromAuth,
        setEmailFromAuth,

        fetchUserInfo,
        articlesArray,
        productsArray,

        userFavsArr,
        top5NewsArray,
      }}
    >
      {props.children}
    </GlobalContexts.Provider>
  );
}

export default GlobalContexts;
