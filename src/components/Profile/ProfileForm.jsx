import React, { useContext, useRef } from "react";
import classes from "./Profile.module.css";
import { styled, TextField, Typography } from "@mui/material";
import LoginContent from "../context/login-token-context";
import GlobalContexts from "../context/global-contexts";

const TextFieldCSS = styled(TextField)({
  variant: "outlined",
  color: "secondary",
  backgroundColor: "white",
  borderRadius: "5px",
});

const ProfileForm = () => {
  const { navigate } = useContext(LoginContent);
  const { localIdFromAuth, emailFromAuth, userKey, fetchUserInfo } =
    useContext(GlobalContexts);

  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const songInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredSong = songInputRef.current.value;

    // fetch post to realtime database
    if (userKey) {
    }
    if (!userKey) {
      fetch(
        "https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
        {
          method: "POST",
          body: JSON.stringify({
            // data.users[0].localId data format from authentication server
            userId: localIdFromAuth,
            userEmail: emailFromAuth,
            name: enteredName,
            surname: enteredSurname,
            song: enteredSong,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((resp) => {
        resp.json().then(() => {
          fetchUserInfo();
          navigate("/", { replace: true });
        });
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Typography variant="h2">Please fill out the form</Typography>
      <TextFieldCSS
        label="name"
        input="name"
        required
        inputRef={nameInputRef}
        id="outlined-basic"
      />
      <TextFieldCSS
        label="surname"
        input="surname"
        required
        inputRef={surnameInputRef}
        id="outlined-basic"
      />
      <TextFieldCSS
        label="song"
        input="song"
        required
        inputRef={songInputRef}
        id="outlined-basic"
      />
      <div className={classes.action}>
        <button>Confirm Data</button>
      </div>
    </form>
  );
};

export default ProfileForm;
