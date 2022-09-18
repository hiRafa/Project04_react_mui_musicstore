import React from "react";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const ButtonSignin = () => {
  return (
    <NavLink to="/login">
      <Button color="whiteTheme">
        <Typography>Log in</Typography>
      </Button>
    </NavLink>
  );
};

export default ButtonSignin;
