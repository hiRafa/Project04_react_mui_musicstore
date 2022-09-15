import React from "react";
import { Box, Button } from "@mui/material";
import BoxPages from "./ui/BoxPages";
import GlobalContexts from "./context/global-contexts";
import { useContext } from "react";
import ProfileForm from "./Profile/ProfileForm";
import UserProfile from "./Profile/UserProfile";

const ProfilePage = () => {
  const { isLoggedin, setIsLoggedin } = useContext(GlobalContexts);

  return (
    <BoxPages>
      {isLoggedin ? "" : <Button></Button>}

      <UserProfile />
    </BoxPages>
  );
};

export default ProfilePage;
