import React, { useContext } from "react";
import ProfileResetPass from "./ProfileResetPass";
import classes from "./Profile.module.css";
import BoxPages from "../ui/BoxPages";
import ProfileForm from "./ProfileForm";
import ProfileInfo from "./ProfileInfo";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      <BoxPages>
        <ProfileForm />
        <ProfileInfo />
        <ProfileResetPass />
      </BoxPages>
    </section>
  );
};

export default UserProfile;
