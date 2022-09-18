import React, { useContext } from "react";
import classes from "./Profile.module.css";
import BoxPages from "../ui/BoxPages";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";
import GlobalContexts from "../context/global-contexts";

const UserProfile = () => {
  const { userInfo } = useContext(GlobalContexts);

  return (
    <section className={classes.profile}>
      <BoxPages>{userInfo ? <ProfileInfo /> : <ProfileForm />}</BoxPages>
    </section>
  );
};

export default UserProfile;
