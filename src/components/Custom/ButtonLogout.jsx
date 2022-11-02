import { Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import LoginContent from "../context/login-token-context";

const ButtonLogout = (props) => {
  const { logout } = useContext(LoginContent);

  const logoutHandler = () => {
    logout();
  };

  return (
    <Button
      color="whiteTheme"
      onClick={logoutHandler}
      className={props.className}
    >
      <Typography>Log out</Typography>
    </Button>
  );
};

export default ButtonLogout;
