import { useContext, useRef } from "react";
import GlobalContexts from "../context/global-contexts";
import classes from "./Profile.module.css";

const ProfileForm = () => {
  const { userToken } = useContext(GlobalContexts);

  const newPasswordRef = useRef();

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const enteredNewPass = newPasswordRef.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: userToken,
          password: enteredNewPass,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      //assuming it always succeeds, skipping ht error handling stage
    });
  };

  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
