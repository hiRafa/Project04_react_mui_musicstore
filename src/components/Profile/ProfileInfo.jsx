import React, { useContext, useState } from "react";
import classes from "./Profile.module.css";
import BoxPages from "../ui/BoxPages";
import ProfileForm from "./ProfileForm";
import GlobalContexts from "../context/global-contexts";

const ProfileInfo = () => {
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
    </section>
  );
};

export default ProfileInfo;
