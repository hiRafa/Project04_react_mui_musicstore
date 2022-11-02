import React from "react";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import GlobalContexts from "../context/global-contexts";

const ButtonSignup = (props) => {
  const { setIsLogin } = useContext(GlobalContexts);

  const setIsLoginToFalse = () => {
    setIsLogin(false);
  };

  return (
    <NavLink to="/login">
      <Button
        color="whiteTheme"
        onClick={setIsLoginToFalse}
        className={props.className}
      >
        <Typography>Sign Up</Typography>
      </Button>
    </NavLink>
  );
};

export default ButtonSignup;
