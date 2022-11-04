import React, { useContext } from "react";
import LoginContent from "./context/login-token-context";

import UserProfile from "./Profile/UserProfile";
import LogInPage from "./LogInPage";
import { Fragment } from "react";

const ProfilePage = () => {
  const { userIsLoggedIn } = useContext(LoginContent);
  // const { userInfo } = useContext(GlobalContexts);
  // console.log(userInfo); // returns false if we dont have userInfo, returns the userInfo if we have in the database

  //BoxPages will be used in UserProfile or LogInpage
  return (
    <Fragment>{userIsLoggedIn ? <UserProfile /> : <LogInPage />}</Fragment>
  );
};

export default ProfilePage;
