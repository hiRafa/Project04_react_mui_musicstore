import React from "react";
import ProfileEditItem from "./ProfileEditItem";
import classes from "./Profile.module.css";
import { useContext } from "react";
import GlobalContexts from "../context/global-contexts";
import { Stack, Typography } from "@mui/material";
import { useRef } from "react";
import LoginTokenContexts from "../context/login-token-context";
import ButtonAll from "../ui/ButtonAll";

const ProfileEditForm = () => {
  const { userInfo, userKey, localIdFromAuth, fetchUserInfo } =
    useContext(GlobalContexts);
  const { navigate } = useContext(LoginTokenContexts);

  const nameRef = useRef();
  const surnameRef = useRef();
  const songRef = useRef();

  // this code works, it worked when I transplanted to the other page
  // upate data according to the user key that we got
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredSurname = surnameRef.current.value;
    const enteredSong = songRef.current.value;
    // const enteredArtist = artistInputRef.current.value;

    fetch(
      `https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}.json`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // data.users[0].localId data format from authentication server
          name: enteredName,
          surname: enteredSurname,
          song: enteredSong,
          // artist: enteredArtist,
          userId: localIdFromAuth,
        }),
      }
    ).then((resp) => {
      resp.json().then((data) => {
        fetchUserInfo();
      });
      navigate("/profile", { replace: true });
    });
    // ).then((resp) => {
    //   // fetch get from authentication server, getting only the user corresponding to the current userToken
    //   resp.json().then((data) => {
    //     console.log(data);
    //   });
    // });
  };

  return (
    <form className={classes.form}>
      <Stack sx={{ gap: "1rem" }}>
        <Typography
          variant="h4"
          sx={{ p: "1rem 1rem 1rem 0" }}
        >{`${userInfo.name} is editing profile`}</Typography>
        <ProfileEditItem
          profilename="Name"
          inputRef={nameRef}
          defaultValue={userInfo.name}
        />
        <ProfileEditItem
          profilename="Surname"
          inputRef={surnameRef}
          defaultValue={userInfo.surname}
        />

        <ProfileEditItem
          profilename={`${userInfo.name}'s Song`}
          inputRef={songRef}
          defaultValue={userInfo.song}
        />

        <ButtonAll
          onClick={submitHandler}
          className={classes.buttonSave}
          buttonTxt="Confirm Data"
        />
      </Stack>
    </form>
  );
};

export default ProfileEditForm;
