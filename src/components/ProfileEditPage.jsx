import BoxPages from "./ui/BoxPages";
import { Card } from "@mui/material";
import React, { useContext} from "react";
import GlobalContexts from "./context/global-contexts";

import classes from "./Profile/Profile.module.css";
import ProfileResetPass from "./Profile/ProfileResetPass";
import ProfileDelete from "./Profile/ProfileDelete";
import ProfileEditForm from "./Profile/ProfileEditForm";

const ProfileEdit = () => {
  const { userInfo } = useContext(GlobalContexts);

  return (
    <BoxPages className={classes.profile}>
      <Card sx={{ width: "100%" }}>
        {userInfo ? <ProfileEditForm /> : <p>Loading</p>}
      </Card>
      <ProfileDelete />
      <ProfileResetPass />
    </BoxPages>
  );
};

export default ProfileEdit;
