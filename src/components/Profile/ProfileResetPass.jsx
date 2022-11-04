import { useRef, useContext } from "react";
import classes from "./Profile.module.css";
import GlobalContexts from "../context/global-contexts";
import LoginContent from "../context/login-token-context";

import ButtonAll from "../ui/ButtonAll";
import { styled, Typography } from "@mui/material";
import { useState } from "react";

const TypographyCSSInvalidData = styled(Typography)({
  fontSize: "1rem",
  color: "var(--color-primary-main)",
});

const checkPassword = (value) =>
  value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

const ProfileResetPass = () => {
  const newPasswordInputRef = useRef();
  const { setIsLoading } = useContext(GlobalContexts);
  const { userToken, navigate, logout } = useContext(LoginContent);

  const [newPasswordValidity, setNewPasswordValidity] = useState({
    newpassword: true,
  });
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // add validation
    const validNewPassword = checkPassword(enteredNewPassword);
    // return if not valid
    if (!validNewPassword) {
      setIsLoading(false);
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userToken,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      // assumption: Always succeeds!
      logout();
      navigate("/login", { replace: true });
    });
  };

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="new-password"
          id="new-password"
          ref={newPasswordInputRef}
        />
      </div>
      {!newPasswordValidity.password && (
        <TypographyCSSInvalidData>
          Weak Password: use at least one uppercase, one lowercase, one symbol
          and between 7~16 characters
        </TypographyCSSInvalidData>
      )}
      <ButtonAll onClick={submitHandler} buttonTxt="Change Password" />
    </form>
  );
};

export default ProfileResetPass;
