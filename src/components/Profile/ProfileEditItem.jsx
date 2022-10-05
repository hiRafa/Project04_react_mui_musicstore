import { Box, styled, TextField } from "@mui/material";
import React from "react";
import TypoTitleForm from "../Custom/TypoTitleForm";

const ProfileEditItem = (props) => {
  const BoxCSS = styled(Box)({
    display: "flex",
    textAlign: "left",
    alignContent: "flex-end",
  });

  const TextFieldCSS = styled(TextField)({
    flex: 3,
  });

  return (
    <BoxCSS>
      <TypoTitleForm profilename={props.profilename} />
      <TextFieldCSS
        label="surname"
        input="surname"
        defaultValue={props.defaultValue}
        required
        inputRef={props.inputRef}
        id="outlined-basic"
        variant="outlined"
        color="secondary"
        sx={{ bgcolor: "white", borderRadius: "5px" }}
      />
    </BoxCSS>
  );
};

export default ProfileEditItem;
