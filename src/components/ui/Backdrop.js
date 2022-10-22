import React from "react";
import classes from "./ui.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onCancel} />;
};

export default Backdrop;
