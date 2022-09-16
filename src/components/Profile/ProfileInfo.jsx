import React, { useContext, useState } from "react";
import classes from "./Profile.module.css";

const ProfileInfo = () => {
  
  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <h2>This is your name</h2>
      <h2>This is your surnam</h2>
      <h2>This is your song</h2>
    </section>
  );
};

export default ProfileInfo;
