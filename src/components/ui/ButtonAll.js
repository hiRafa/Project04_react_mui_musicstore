import React from "react";
import classes from "./ui.module.css";

const ButtonAll = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`${classes.button} ${props.className}`}
    >
      {props.buttonTxt}
    </button>
  );
};

export default ButtonAll;
