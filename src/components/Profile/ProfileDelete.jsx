import { useContext } from "react";
import GlobalContexts from "../context/global-contexts";
import LoginTokenContexts from "../context/login-token-context";
import ButtonAll from "../ui/ButtonAll";
import classes from "./Profile.module.css";
import Section from "../ui/Section";

const ProfileDelete = () => {
  const { navigate, userToken, logout } = useContext(LoginTokenContexts);
  const { userKey, fetchUserInfo, userFavsArr } = useContext(GlobalContexts);
  console.log(userFavsArr);

  const deleteDataHandler = (event) => {
    event.preventDefault();

    // Delete data from firebase realtime database
    fetch(
      `https://project04favoritecards-default-rtdb.asia-southeast1.firebasedatabase.app/users/${userKey}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => {
      resp.json().then(() => {
        fetchUserInfo();
      });
      navigate("/profile", { replace: true });
    });
    console.log(userFavsArr);
  };

  const deleteAccountHandler = (event) => {
    event.preventDefault();

    // DElete user from firebase auth
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((resp) => {
      deleteDataHandler(event);
      logout();
      navigate("/profile", { replace: true });
    });
  };

  return (
    <Section className={classes.sectionButtonsDelete}>
      <ButtonAll onClick={deleteDataHandler} buttonTxt="Delete Data" />
      <ButtonAll onClick={deleteAccountHandler} buttonTxt="Delete Account" />
    </Section>
  );
};

export default ProfileDelete;
