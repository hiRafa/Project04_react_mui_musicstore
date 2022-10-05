import React from "react";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import GlobalContexts from "../context/global-contexts";

const ButtonSignin = (props) => {
  const { setIsLogin } = useContext(GlobalContexts);

  const setIsLoginToTrue = () => {
    setIsLogin(true);
  };

  return (
    <NavLink to="/login">
      <Button color="whiteTheme" onClick={setIsLoginToTrue}>
        <Typography>
          {props.buttonTxt === undefined ? "Log in" : props.buttonTxt}
        </Typography>
      </Button>
    </NavLink>
  );
};

export default ButtonSignin;
