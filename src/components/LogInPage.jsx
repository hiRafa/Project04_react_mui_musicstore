import {
  Box,
  Card,
  CardContent,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import GlobalContexts from "./context/global-contexts";
import BoxPages from "./ui/BoxPages";
import classes from "./Signup.module.css";
import LoginTokenContexts from "./context/login-token-context";
import { useState } from "react";

const TypographyCSSInvalidData = styled(Typography)({
  fontSize: "1rem",
  color: "var(--color-primary-main)",
});

// Helper functions to validated input data
// const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@") && value.length > 3;
const checkPassword = (value) =>
  value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

// -------------------------------------------------------------------------

const LogIn = () => {
  const { isLogin, setIsLogin, isLoading, setIsLoading, userInfo } =
    useContext(GlobalContexts);
  const { login, navigate } = useContext(LoginTokenContexts);

  // States and Refs for Email and Password and Form Validity
  const [formInputsValidity, setFormInputsValidity] = useState({
    email: true,
    password: true,
  });
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    // Gather the input
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // Validate Input
    const validEmail = isEmail(enteredEmail);
    const validPassword = checkPassword(enteredPassword);

    // Set loading to true when this functions runs and gathers the refs
    setIsLoading(true);

    // Setting the validEmail and validPassword to email and password to state formInputsValidity to change their state to true or false.
    setFormInputsValidity({ email: validEmail, password: validPassword });

    // Setting formIsValid state to true if both are true
    const formIsValid = validEmail && validPassword;

    // Dont allow to fetch is the form is not valid
    if (!formIsValid) {
      setIsLoading(false);
      return;
    }

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
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        login(data.idToken, expirationTime.toISOString());

        navigate(userInfo && "/", { replace: true });

        // replace true to avoid users going back to log in page with the backward web functionality
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const hasAccountOrNotHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <BoxPages>
      <section>
        <Card>
          <CardContent>
            <Typography variant="h4" paddingBottom="20px">
              {isLogin ? "Login" : "Sign Up"}
            </Typography>
            <form onSubmit={submitHandler}>
              <Stack sx={{ gap: "2rem" }}>
                <Box sx={{ gap: ".5rem" }}>
                  {!formInputsValidity.email && (
                    <TypographyCSSInvalidData>
                      Email not valid
                    </TypographyCSSInvalidData>
                  )}
                  <TextField
                    label="Email"
                    input="Email"
                    required
                    inputRef={emailInputRef}
                  />
                </Box>
                <Box sx={{ gap: ".5rem" }}>
                  <TextField
                    label="Password"
                    input="Password"
                    required
                    inputRef={passwordInputRef}
                  />

                  {!formInputsValidity.password && (
                    <TypographyCSSInvalidData>
                      Weak Password: use at least one uppercase, one lowercase,
                      one symbol and between 7~16 characters
                    </TypographyCSSInvalidData>
                  )}
                </Box>
              </Stack>

              <div className={classes.actions}>
                <button>{isLogin ? "Login" : "Create Account"}</button>
                {isLoading && <p>Sending request...</p>}
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={hasAccountOrNotHandler}
                >
                  {isLogin
                    ? "Create new account"
                    : "Login with existing account"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </BoxPages>
  );
};

export default LogIn;
