import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import GlobalContexts from "../context/global-contexts";

const ButtonLogout = () => {
  const { logout } = useContext(GlobalContexts);

  const logoutHandler = () => {
    logout();
  };

  return (
    <Button color="whiteTheme" onClick={logoutHandler}>
      <Typography>Log out</Typography>
    </Button>
  );
};

export default ButtonLogout;
