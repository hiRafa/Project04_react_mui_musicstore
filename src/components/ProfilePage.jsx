import React, { useContext } from "react";
import BoxPages from "./ui/BoxPages";
import UserProfile from "./Profile/UserProfile";

import LoginContent from "./context/login-token-context";
// import GlobalContexts from "./context/global-contexts";
import LogIn from "./LogInPage";

const ProfilePage = () => {
  const { userIsLoggedIn } = useContext(LoginContent);
  // const { userInfo } = useContext(GlobalContexts);
  // console.log(userInfo); // returns false if we dont have userInfo, returns the userInfo if we have in the database

  return <BoxPages>{userIsLoggedIn ? <UserProfile /> : <LogIn />}</BoxPages>;
};

export default ProfilePage;
