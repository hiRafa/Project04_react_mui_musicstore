import React, { useContext, useRef } from "react";
import classes from "./Profile.module.css";
import GlobalContexts from "../context/global-contexts";
import { TextField } from "@mui/material";

const ProfileForm = () => {
  const { localIdFromAuth, emailFromAuth } = useContext(GlobalContexts);
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const songInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredSong = songInputRef.current.value;

    // fetch post to realtime database
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
    ).then(() => {});
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <h1>Please fill out the form</h1>
      <TextField
        label="name"
        input="name"
        required
        inputRef={nameInputRef}
        id="outlined-basic"
        variant="outlined"
        color="secondary"
        sx={{ bgcolor: "white", borderRadius: "5px" }}
      />
      <TextField
        label="surname"
        input="surname"
        required
        inputRef={surnameInputRef}
        id="outlined-basic"
        variant="outlined"
        color="secondary"
        sx={{ bgcolor: "white", borderRadius: "5px" }}
      />
      <TextField
        label="song"
        input="song"
        required
        inputRef={songInputRef}
        id="outlined-basic"
        variant="outlined"
        color="secondary"
        sx={{ bgcolor: "white", borderRadius: "5px" }}
      />
      <div className={classes.action}>
        <button>Confirm Data</button>
      </div>
    </form>
  );
};

export default ProfileForm;
