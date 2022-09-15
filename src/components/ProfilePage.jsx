import React, { useContext } from "react";
import { Button } from "@mui/material";
import BoxPages from "./ui/BoxPages";
import GlobalContexts from "./context/global-contexts";
import UserProfile from "./Profile/UserProfile";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const { userIsLoggedIn } = useContext(GlobalContexts);

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
