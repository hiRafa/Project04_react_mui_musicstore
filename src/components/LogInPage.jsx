import {
  Card,
  CardContent,
  Divider,
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
import { theme } from "../theme";

const TextFieldCSSValid = styled(TextField)({
  id: "outlined-basic",
  borderRadius: "5px",
  variant: "outlined",
  // "& .Mui-focused": {
  //   backgroundColor: `${theme.palette.primary.dark}`,
  //   color: `${theme.palette.secondary.light}`,
  // },
  "&:hover": {
    backgroundColor: `${theme.palette.primary.light}`,
  },
  "& .Mui-selected": {
    color: `${theme.palette.secondary.light}`,
  },
});

const TextFieldCSSInvalid = styled(TextField)({
  id: "outlined-basic",
  backgroundColor: "red",
  borderRadius: "5px",
  variant: "outlined",
  "& .Mui-focused": {
    backgroundColor: `${theme.palette.secondary.light}`,
    color: `${theme.palette.primary.dark}`,
  },
  "&:hover": {
    backgroundColor: `${theme.palette.secondary.light}`,
  },
});

// Helper functions to validated input data
const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@") && value.length > 3;
const checkPassword = (value) =>
  value.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);

// -------------------------------------------------------------------------

const LogIn = () => {
  const { isLogin, isLoading, setIsLoading, hasAccountOrNotHandler, userInfo } =
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

        navigate(userInfo ? "/profile" : "/", { replace: true });

        // replace true to avoid users going back to log in page.
      })
      .catch((err) => {
        alert(err.message);
      });
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
              <Stack sx={{ gap: "30px" }}>
                {!formInputsValidity.email ? (
                  <TextFieldCSSInvalid
                    label="Email"
                    input="Email"
                    required
                    inputRef={emailInputRef}
                  />
                ) : (
                  <TextFieldCSSValid
                    label="Email"
                    input="Email"
                    required
                    inputRef={emailInputRef}
                  />
                )}
                {!formInputsValidity.email && <p>Email not valid</p>}

                <TextFieldCSSValid
                  label="Password"
                  input="Password"
                  required
                  inputRef={passwordInputRef}
                  sx={
                    !formInputsValidity.email
                      ? {
                          "& .Mui-focused": {
                            backgroundColor: `${theme.palette.primary.dark}`,
                            color: `${theme.palette.secondary.light}`,
                          },
                        }
                      : {
                          backgroundColor: "red",
                          "& .Mui-focused": {
                            backgroundColor: `${theme.palette.secondary.light}`,
                            color: `${theme.palette.primary.dark}`,
                          },
                        }
                  }
                />

                {!formInputsValidity.password && <p>Weak Password</p>}
              </Stack>

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
