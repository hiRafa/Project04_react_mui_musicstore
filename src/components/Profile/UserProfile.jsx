import React, { useContext } from "react";
import ProfileResetPass from "./ProfileResetPass";
import classes from "./Profile.module.css";
import BoxPages from "../ui/BoxPages";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";
import GlobalContexts from "../context/global-contexts";

const UserProfile = () => {
  const { userIdExists } = useContext(GlobalContexts);

  return (
    <section className={classes.profile}>
      <BoxPages>
        {userIdExists ? <ProfileInfo /> : <ProfileForm />}
        <ProfileResetPass />
      </BoxPages>
    </section>
  );
};

export default UserProfile;
