import { useRef, useContext } from "react";
import LoginContent from "../context/login-token-context";
import ButtonAll from "../ui/ButtonAll";
import classes from "./Profile.module.css";

const checkPassword = (value) =>
  value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

const ProfileResetPass = () => {
  const newPasswordInputRef = useRef();

  const { userToken, navigate, logout } = useContext(LoginContent);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    const validNewPassword = checkPassword(enteredNewPassword);

    // add validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userToken,
          password: validNewPassword,
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
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
      <ButtonAll onClick={submitHandler} buttonTxt="Change Password" />
    </form>
  );
};

export default ProfileResetPass;
