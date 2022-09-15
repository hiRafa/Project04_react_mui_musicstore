import { TextField, Stack, Button, Box } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "react";
import { useRef } from "react";
// import { useHistory } from "react-router-dom";
import GlobalContexts from "./context/global-contexts";
import BoxPages from "./ui/BoxPages";
import classes from "./Signup.module.css";
import AuthContext from "./context/auth-context";

const LogIn = () => {
  // const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const { hasAccount, hasAccountOrNotHandler } = useContext(GlobalContexts);

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (hasAccount) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPecGF3jCW2FZYzgdnIlYfr_7PQ7ufx88";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            // if (data && data.error && data.error.message) {
            //   errorMessage = data.error.message;
            // }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <BoxPages>
      <section className={classes.auth}>
        <h1>{hasAccount ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <TextField
            label="email"
            input="email"
            required
            inputRef={emailInputRef}
            id="outlined-basic"
            variant="outlined"
            color="secondary"
            sx={{ bgcolor: "white", borderRadius: "5px" }}
          />
          <TextField
            label="password"
            input="password"
            required
            inputRef={passwordInputRef}
            id="outlined-basic"
            variant="outlined"
            color="secondary"
            sx={{ bgcolor: "white", borderRadius: "5px" }}
          />

          {/* <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div> */}
          {/* <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div> */}
          <div className={classes.actions}>
            {!isLoading && (
              <Button>{hasAccount ? "Login" : "Create Account"}</Button>
            )}
            {isLoading && <p>Sending request...</p>}
            {hasAccount ? (
              <Button onClick={hasAccountOrNotHandler} variant="text">
                "Create new account"
              </Button>
            ) : (
              <Button onClick={hasAccountOrNotHandler} variant="text">
                "Login with existing account"
              </Button>
            )}
          </div>
        </form>
      </section>
    </BoxPages>
  );
};

export default LogIn;
