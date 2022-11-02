import { Fragment } from "react";
import { useContext, useRef, useState } from "react";
import GlobalContexts from "../context/global-contexts";

import classes from "./Cart.module.css";
import ProfileInfo from "../Profile/ProfileInfo";
import ProfileNew from "../Profile/ProfileNew";
import ProfilePage from "../ProfilePage";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const { userInfo } = useContext(GlobalContexts);
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    surname: true,
    song: true,
  });

  console.log(userInfo);
  const confirmProfileHandler = (event) => {
    event.preventDefault();
    if (userInfo) {
      const enteredName = userInfo.name;
      const enteredSurname = userInfo.surname;
      const enteredSong = userInfo.song;

      const enteredNameIsValid = !isEmpty(enteredName);
      const enteredSurnameIsValid = !isEmpty(enteredSurname);
      const enteredSongIsValid = !isEmpty(enteredSong);

      setFormInputsValidity({
        name: enteredNameIsValid,
        surname: enteredSurnameIsValid,
        song: enteredSongIsValid,
      });

      const formIsValid =
        enteredNameIsValid && enteredSurnameIsValid && enteredSongIsValid;

      if (!formIsValid) {
        return;
      }

      props.onConfirmDataTo({
        name: enteredName,
        surname: enteredSurname,
        song: enteredSong,
      });
    }
  };

  const nameInputRef = useRef();
  const surnameRef = useRef();
  const songRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameRef.current.value;
    const enteredSong = songRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredSurnameIsValid = !isEmpty(enteredSurname);
    const enteredSongIsValid = !isEmpty(enteredSong);
    // const enteredsongIsValid = isFiveChars(enteredSong);

    setFormInputsValidity({
      name: enteredNameIsValid,
      surname: enteredSurnameIsValid,
      city: enteredSongIsValid,
    });

    const formIsValid =
      enteredNameIsValid && enteredSurnameIsValid && enteredSongIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      surname: enteredSurname,
      city: enteredSong,
    });
  };

  // CSS classes based on validity
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const surnameControlClasses = `${classes.control} ${
    formInputsValidity.surname ? "" : classes.invalid
  }`;
  const songControlClasses = `${classes.control} ${
    formInputsValidity.song ? "" : classes.invalid
  }`;

  return (
    <Fragment>
      {userInfo ? (
        <form className={classes.form} onSubmit={confirmProfileHandler}>
          <ProfileInfo />
          <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>
              Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
          </div>
        </form>
      ) : (
        // <form className={classes.form} onSubmit={confirmHandler}>
        //   <div className={nameControlClasses}>
        //     <label htmlFor="name">Name</label>
        //     <input type="text" id="name" ref={nameInputRef} />
        //     {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        //   </div>
        //   <div className={surnameControlClasses}>
        //     <label htmlFor="surname">surname</label>
        //     <input type="text" id="surname" ref={surnameRef} />
        //     {!formInputsValidity.surname && (
        //       <p>Please enter a valid surname!</p>
        //     )}
        //   </div>
        //   <div className={songControlClasses}>
        //     <label htmlFor="song">Song Code</label>
        //     <input type="text" id="song" ref={songRef} />
        //     {!formInputsValidity.song && (
        //       <p>Please enter a valid song code (5 characters long)!</p>
        //     )}
        //   </div>
        //   <div className={classes.actions}>
        //     <button type="button" onClick={props.onCancel}>
        //       Cancel
        //     </button>
        //     <button className={classes.submit}>Confirm</button>
        //   </div>
        // </form>
        <ProfilePage />
      )}
    </Fragment>
  );
};

export default Checkout;
