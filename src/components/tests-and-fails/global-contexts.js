// import { Box, styled } from "@mui/material";
// import { type } from "@testing-library/user-event/dist/type";
import React, { createContext, useContext, useEffect, useState } from "react";
import LoginTokenContexts from "./login-token-context";

const GlobalContexts = createContext();

export function GlobalContextsProvider(props) {
  // ---------------------  Slider
  const [currentPage, setCurrentPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const closeModalHandler = () => {
    setmodalIsOpen(false);
  };
  const openModalHandler = () => {
    setmodalIsOpen(true);
  };

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

  // const fetchUserInfo = () => {
  //   if (userIsLoggedIn) {
  //     fetch(
  //       "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
  //     ).then((resp) => {
  //       // fetch get from authentication server, getting only the user corresponding to the current userToken
  //       resp.json().then((data) => {
  //         const doesExist = (obj, value) => {
  //           for (let key in obj) {
  //             if (obj[key].userId === value) {
  //               return obj[key];
  //             }
  //           }
  //           return false;
  //         };
  //         function getObjKey(obj, value) {
  //           return Object.keys(obj).find((key) => obj[key].userId === value);
  //         }

  //         setUserInfo(doesExist(data, localIdFromAuth));
  //         setUserKey(getObjKey(data, localIdFromAuth));
  //         // check if it is returning true when logging in with an account that has data registered in the realtime database
  //         // console.log(userInfo);
  //         // console.log(localIdFromAuth);

  //         // this expressions were returning true or false for each key
  //         // let findUserIdInDTBase = Object.keys(data).some(
  //         //   (key) => data[key] === localIdFromAuth
  //         // );
  //         // console.log(findUserIdInDTBase);
  //         // for (const key in data) {
  //         //   let findUserIdInDTBase = Object.values(data[key]).includes(
  //         //     localIdFromAuth
  //         //   );
  //         //   console.log(findUserIdInDTBase);
  //       });
  //     });
  //   }
  //   if (!userIsLoggedIn) {
  //     setUserInfo();
  //     setUserKey();
  //   }
  // };
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
        console.log(responseData);

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

  // --------------------------- Fetch the recent NEWS array for the home page

  const [recentNewsArray, setrecentNewsArray] = useState();
  useEffect(() => {
    setIsLoading(true);
    const fetch5RecentNews = async () => {
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
        });
        console.log("number2");
      }
      setrecentNewsArray(arrayHelper); //setting the fetched data with useState
      setIsLoading(false);
      console.log("number3");
    };
    fetch5RecentNews().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    console.log("number1");
  }, []);

  // --------------------------- Fetch the PRODUCTS for the home page and favorites page
  const [productsArray, setProductsArray] = useState();
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
              type: key,
              name: responseData[key][nestedKey].name,
              description: responseData[key][nestedKey].description,
              price: responseData[key][nestedKey].price,
              img: responseData[key][nestedKey].img,
            });
          });
        }
      });
      console.log(helperArray);

      setProductsArray(helperArray);
      setIsLoading(false);

      // ------------------ Main code attempt 1, problem: itwas generating an object for each upper level key "pianos", "guitars" categories.
      // And I was not able to assign the upper level key as a type key:value to each instrument object.

      // const helperArray = [];
      // const iterate = (obj) => {
      //   Object.keys(obj).forEach((key) => {
      //     // console.log(`${key}: ${obj[key]}`);
      //     if (typeof obj[key] === "object" && obj[key] !== null) {
      //       helperArray.push({
      //         id: key,
      //         type: Object.keys(obj)[key],
      //         name: obj[key].name,
      //         description: obj[key].description,
      //         price: obj[key].price,
      //       });
      //       iterate(obj[key]);
      //     }
      //   });
      // };
      // iterate(responseData);
      // console.log(helperArray);
      // this loop generates an array with all objects, bt the problem is that main keys "pianos", "ocarinas", etc, they also get an empty object
      // only with id, so we need to remove them. ↓↓

      // Creating a new array using the same condition for the filter. We know that the name and other properties for object "guitars", 'pianos' and
      // other main keys are empty looking at the console log. so we just filter by removing the objects with undefined properties
      // let filteredHelperArray;
      // const findIndex = () => {
      //   filteredHelperArray = helperArray.filter((object) => {
      //     return object.name !== undefined;
      //   });
      //   helperArray.splice(filteredHelperArray, 1);
      // };
      // findIndex();
      // console.log(filteredHelperArray);

      // Mutating the original Array with findIndex and splice.
      // The findIndex method returns -1 if the condition is never satisfied.
      // If we pass -1 as a start index to the splice method, it would remove the last element from the array, which would be a bug in our program.
      // If this is a possible scenario in your code, use the filter() method from the next example. https://bobbyhadz.com/blog/javascript-remove-object-from-array-by-value
      // let indexOfObject;
      // const findIndex = (idValue) => {
      //   indexOfObject = helperArray.findIndex((object) => {
      //     return object.id === idValue;
      //   });
      //   helperArray.splice(indexOfObject, 1);
      // };
      // findIndex("guitars");
      // findIndex("pianos");
      // findIndex("ocarinas");
      // console.log(helperArray);
      // setProductsArray(helperArray);

      // setProductsArray(filteredHelperArray);
      // setIsLoading(false);
    };
    fetchProducts().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  // creating an array with all the values inside the user favorites IDs
  const userFavsArr = [];
  if (userInfo && userInfo.favoritesIDs) {
    Object.values(userInfo.favoritesIDs).forEach((nestedValue) => {
      Object.values(nestedValue).forEach((value) => {
        userFavsArr.push(value);
      });
    });
  }
  // const userFavsTotal = userFavsArr.length;

  return (
    <GlobalContexts.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentIndex,
        setCurrentIndex,
        modalIsOpen,
        setmodalIsOpen,
        openModalHandler,
        closeModalHandler,

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
        recentNewsArray,
        productsArray,

        userFavsArr,
      }}
    >
      {props.children}
    </GlobalContexts.Provider>
  );
}

export default GlobalContexts;
