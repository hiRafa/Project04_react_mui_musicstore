import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import BoxPages from "./ui/BoxPages";
import UserProfile from "./Profile/UserProfile";
import { NavLink } from "react-router-dom";
import LoginContent from "./context/login-token-context";
import CardPost from "./ui/CardPost";
import GlobalContexts from "./context/global-contexts";

const ProfilePage = () => {
  const { userIsLoggedIn } = useContext(LoginContent);
  const { userInfo } = useContext(GlobalContexts);
  console.log(userInfo);

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
