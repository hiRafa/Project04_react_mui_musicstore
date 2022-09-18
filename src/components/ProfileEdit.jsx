import BoxPages from "./ui/BoxPages";
import {
  Box,
  Button,
  Card,
  Divider,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useRef } from "react";
import GlobalContexts from "./context/global-contexts";
import LoginTokenContexts from "./context/login-token-context";
import classes from "./Profile/Profile.module.css";
import ProfileResetPass from "./Profile/ProfileResetPass";
import TypoTitleForm from "./Custom/TypoTitleForm";
import { Link, NavLink } from "react-router-dom";

const BoxCSS = styled(Box)({
  display: "flex",
  textAlign: "left",
  alignContent: "flex-end",
});

const TypoTitleCSS = styled(Typography)({
  flex: 1,
  padding: ".5rem",
});

const TextFieldCSS = styled(TextField)({
  flex: 3,
});

const ProfileEdit = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { userInfo, userKey, localIdFromAuth, fetchUserInfo, setUserInfo } =
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
    <BoxPages className={classes.profile}>
      <Card sx={{ width: "100%" }}>
        <form className={classes.form} onSubmit={submitHandler}>
          <Stack>
            <Typography
              variant="h4"
              sx={{ p: 3 }}
            >{`${userInfo.name} is editing profile`}</Typography>
            <BoxCSS>
              <TypoTitleForm profilename={"Name"} />
              <TextFieldCSS
                label="name"
                input={userInfo.name}
                defaultValue={userInfo.name}
                required
                inputRef={nameRef}
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                sx={{ bgcolor: "white", borderRadius: "5px" }}
              >
                {userInfo.name}
              </TextFieldCSS>
            </BoxCSS>
            <BoxCSS>
              <TypoTitleForm profilename={"Surname"} />
              <TextFieldCSS
                label="surname"
                input="surname"
                required
                inputRef={surnameRef}
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                sx={{ bgcolor: "white", borderRadius: "5px" }}
              />
            </BoxCSS>
            <BoxCSS>
              <TypoTitleForm profilename={`${userInfo.name}'s Song"}`} />
              <TextFieldCSS
                label="song"
                input="song"
                required
                inputRef={songRef}
                id="outlined-basic"
                variant="outlined"
                color="secondary"
                sx={{ bgcolor: "white", borderRadius: "5px" }}
              />
            </BoxCSS>

            <div className={classes.action}>
              <button>Confirm Data</button>
            </div>
          </Stack>
        </form>
      </Card>
      <ProfileResetPass />
    </BoxPages>
  );
};

export default ProfileEdit;
