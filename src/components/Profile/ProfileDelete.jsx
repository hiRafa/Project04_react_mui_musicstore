import { Logout } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useContext } from "react";
import GlobalContexts from "../context/global-contexts";
import LoginTokenContexts from "../context/login-token-context";
import classes from "./Profile.module.css";

const ProfileDelete = () => {
  const { navigate, userToken, logout } = useContext(LoginTokenContexts);
  const { userKey, fetchUserInfo } = useContext(GlobalContexts);

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
    <Stack>
      <form className={classes.form} onSubmit={deleteDataHandler}>
        <div className={classes.action}>
          <button>Delete Data</button>
        </div>
      </form>
      <form className={classes.form} onSubmit={deleteAccountHandler}>
        <div className={classes.action}>
          <button>Delete Account</button>
        </div>
      </form>
    </Stack>
  );
};

export default ProfileDelete;
