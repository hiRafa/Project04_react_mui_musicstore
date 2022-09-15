import React, { createContext, useContext, useState } from "react";
import GlobalContexts from "./global-contexts";

const FetchContexts = createContext();

export const FetchContextProvider = (props) => {
  const { userToken } = useContext(GlobalContexts);
  const [localIdFromAuth, setLocalIdFromAuth] = useState();

  const getFromAuthLocalId = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => {
      // fetch get from authentication server, getting only the user corresponding to the current userToken
      resp.json().then((data) => {
        const localID = data.users[0].localId;
        setLocalIdFromAuth(localID);
      });
    });
  };

  return (
    <FetchContexts.Provider
      value={(localIdFromAuth, setLocalIdFromAuth, getFromAuthLocalId)}
    >
      {props.children}
    </FetchContexts.Provider>
  );
};

export default FetchContexts;
