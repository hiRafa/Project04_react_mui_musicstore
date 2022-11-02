import React, { useEffect, useId } from "react";
import { styled, Checkbox } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import GlobalContexts from "../context/global-contexts";
import { useContext } from "react";
import { useState } from "react";

const CheckboxCSS = styled(Checkbox)({
  color: "var(--color-primary-light)",
  ":hover": {
    color: "var(--color-seconday-main)",
    cursor: "pointer",
    transition: "all 0.25s linear",
  },
});

const label = { inputProps: { "aria-label": "Checkbox " } };

const ButtonFavorites = ({ keyForFavorites }) => {
  const { fetchUserInfo, userKey, userFavsArr, userInfo } =
    useContext(GlobalContexts);
  const [heartChecked, setHeartChecked] = useState(false);
  useEffect(() => {
    userFavsArr.includes(keyForFavorites)
      ? setHeartChecked(true)
      : setHeartChecked(false);
  }, [keyForFavorites, userFavsArr]);
  // console.log(keyForFavorites);
  // Setting the state chcked or unchcked for the button to load as checked if the favorite ID exists in the array of favorites we just created
  // or not, and to update when we use the fetch put or fetch delete

  let randomID = useId();
  const fetchHelper = (PUTdelete) => {
    fetch(
      `https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}/favoritesIDs/${randomID}.json`,
      {
        method: PUTdelete,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: keyForFavorites,
        }),
      }
    ).then((resp) => {
      resp.json().then((data) => {
        fetchUserInfo();
      });
    });
  };

  const handleClick = () => {
    // console.log(keyForFavorites);
    if (!userKey) return;
    if (!userFavsArr.includes(keyForFavorites)) {
      fetchHelper("PUT");
      setHeartChecked(true);
    }
    if (userFavsArr.includes(keyForFavorites)) {
      fetchHelper("DELETE");
      setHeartChecked(false);
    }
  };

  return (
    <div onClick={(event) => handleClick(event, keyForFavorites)}>
      {userInfo && (
        <CheckboxCSS
          {...label}
          checked={heartChecked}
          icon={<FavoriteBorder />}
          checkedIcon={<Favorite />}
        />
      )}
    </div>
  );
};

export default ButtonFavorites;
