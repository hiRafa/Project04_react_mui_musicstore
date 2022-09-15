import React from "react";
import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const ButtonSignup = () => {
  return (
    <NavLink to="/login">
      <Button color="whiteTheme">
        <Typography>Sign Up</Typography>
      </Button>
    </NavLink>
  );
};

export default ButtonSignup;
