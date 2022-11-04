import React, { useContext, Fragment } from "react";
import { NavLink } from "react-router-dom";
import GlobalContexts from "../context/global-contexts";
import classes from "./Profile.module.css";

import ProfileNew from "./ProfileNew";
import ProfileInfo from "./ProfileInfo";
import ButtonAll from "../ui/ButtonAll";
import BoxPages from "../ui/BoxPages";

const UserProfile = () => {
  const { userInfo } = useContext(GlobalContexts);

  return (
    <BoxPages className={classes.userprofilePage}>
      {userInfo ? (
        <Fragment>
          <ProfileInfo />
          <NavLink to="/profileedit">
            <ButtonAll buttonTxt="Edit" />
          </NavLink>
        </Fragment>
      ) : (
        <ProfileNew />
      )}
    </BoxPages>
  );
};

export default UserProfile;
