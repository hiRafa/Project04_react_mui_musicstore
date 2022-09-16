import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import BoxPages from "./ui/BoxPages";
import UserProfile from "./Profile/UserProfile";
import { NavLink } from "react-router-dom";
import LoginContent from "./context/login-token-context";
import CardPost from "./InnerContent/CardPost";

const ProfilePage = () => {
  const { userIsLoggedIn, localIdFromAuth } = useContext(LoginContent);

  return (
    <BoxPages>
      {userIsLoggedIn ? (
        <UserProfile />
      ) : (
        <NavLink to="/login">
          <Button> Please Log in </Button>
        </NavLink>
      )}
    </BoxPages>
  );
};

export default ProfilePage;
