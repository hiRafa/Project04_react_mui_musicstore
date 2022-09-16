import { TextField } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import GlobalContexts from "./context/global-contexts";
import BoxPages from "./ui/BoxPages";
import classes from "./Signup.module.css";
import LoginContent from "./context/login-token-context";

const LogIn = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // const authCtx = useContext(AuthContext);
  const { isLogin, isLoading, setIsLoading, hasAccountOrNotHandler } =
    useContext(GlobalContexts);

  const { login, navigate } = useContext(LoginContent);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
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
        console.log(res);
        if (res.ok) {
          console.log(res);
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
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        login(data.idToken, expirationTime.toISOString());

        navigate("/", { replace: true });

        // replace true to avoid users going back to log in page.
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <BoxPages>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
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

          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={hasAccountOrNotHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </BoxPages>
  );
};

export default LogIn;
